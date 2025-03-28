import { auth, clerkClient } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { db } from '~/server/db';
import { images } from '~/server/db/schema';
import { ratelimit } from '~/server/ratelimit';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: '4MB',
            maxFileCount: 5,
        },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth();

            // If you throw, the user will not be able to upload
            if (!user.userId) {
                throw new UploadThingError('Unauthorized') as Error;
            }

            const client = await clerkClient();
            const fullUserData = await client.users.getUser(user.userId);
            if (!fullUserData.privateMetadata.canUpload) {
                throw new UploadThingError(
                    'The user does not have a permission to upload files',
                ) as Error;
            }

            const { success } = await ratelimit.limit(user.userId);

            if (!success) {
                throw new UploadThingError('The request has been rate limited.') as Error;
            }

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            await db
                .insert(images)
                .values({ name: file.name, url: file.ufsUrl, userId: metadata.userId });

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

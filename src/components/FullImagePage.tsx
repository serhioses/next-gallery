import { clerkClient } from '@clerk/nextjs/server';
import { getImage } from '~/server/queries';
import { Button } from './ui/button';
import { deleteImageAction } from '~/server/actions';

type TFullImagePageProps = { imageId: number };

export async function FullImagePage(props: TFullImagePageProps) {
    const image = await getImage(props.imageId);
    const client = await clerkClient();
    const uploaderInfo = await client.users.getUser(image.userId);
    const deleteImageWithId = deleteImageAction.bind(null, image.id);

    return (
        <div className="flex h-full w-full">
            <div className="flex min-w-0 flex-grow-1 items-center justify-center">
                <img src={image.url} alt="" className="object-contain" />
            </div>
            <div className="flex w-80 flex-shrink-0 flex-col border-l">
                <div className="border-b p-2 text-lg">{image.name}</div>
                <div className="flex flex-col p-2">
                    <span>Uploaded by:</span>
                    <span>{uploaderInfo.fullName}</span>
                </div>
                <div className="flex flex-col p-2">
                    <span>Created at:</span>
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
                <form action={deleteImageWithId} className="p-2">
                    <Button variant="destructive" className="cursor-pointer">
                        Delete
                    </Button>
                </form>
            </div>
        </div>
    );
}

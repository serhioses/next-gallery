import { auth } from '@clerk/nextjs/server';
import 'server-only';
import { db } from '~/server/db';

export async function getMyImages() {
    const user = await auth();

    if (!user.userId) {
        throw new Error('Unauthorized');
    }

    const images = await db.query.images.findMany({
        where(fields, operators) {
            return operators.eq(fields.userId, user.userId);
        },
        orderBy(fields, operators) {
            return operators.desc(fields.id);
        },
    });

    return images;
}

export async function getImage(imageId: number) {
    const user = await auth();

    if (!user.userId) {
        throw new Error('Unauthorized');
    }

    // const image = await db.query.images.findFirst({
    //     where(fields, { and, eq }) {
    //         return and(eq(fields.userId, user.userId), eq(fields.id, imageId));
    //     },
    // });
    const image = await db.query.images.findFirst({
        where(fields, { eq }) {
            return eq(fields.id, imageId);
        },
    });

    if (image?.userId !== user.userId) {
        throw new Error('Unauthorized');
    }

    if (!image) {
        throw new Error('Image not found');
    }

    return image;
}

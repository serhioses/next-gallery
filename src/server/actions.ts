'use server';

import { redirect } from 'next/navigation';
import { deleteImage } from './queries';
import { analyticsServerClient } from './analytics';

export async function deleteImageAction(imageId: number) {
    const userId = await deleteImage(imageId);

    analyticsServerClient.capture({
        distinctId: userId,
        event: 'delete image',
        properties: {
            imageId,
        },
    });

    redirect('/');
}

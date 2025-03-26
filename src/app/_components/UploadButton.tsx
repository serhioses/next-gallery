'use client';
import { useRouter } from 'next/navigation';
import { UploadButtonGenerated } from '~/utils/uploadthing';

export function UploadButton() {
    const router = useRouter();

    return (
        <UploadButtonGenerated
            endpoint="imageUploader"
            onClientUploadComplete={() => {
                router.refresh();
            }}
        />
    );
}

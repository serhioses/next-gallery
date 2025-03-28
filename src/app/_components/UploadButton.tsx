'use client';

import { useRouter } from 'next/navigation';
import { generatePermittedFileTypes } from 'uploadthing/client';
import { toast } from 'sonner';
import clsx from 'clsx';
import { UploadSVGIcon } from '~/components/CustomIcons';
import { routeRegistry, useUploadThing } from '~/utils/uploadthing';
import { usePostHog } from 'posthog-js/react';
import { useUser } from '@clerk/nextjs';

export function UploadButton() {
    const { accept, multiple, isUploading, onChange } = useUploadFilesInputProps(
        routeRegistry.imageUploader,
    );

    return (
        <div>
            <label
                htmlFor="upload-button"
                className={clsx({
                    'cursor-pointer': !isUploading,
                    'pointer-events-none opacity-50': isUploading,
                })}
                title="Upload files"
            >
                <UploadSVGIcon />
            </label>
            <input
                id="upload-button"
                type="file"
                accept={accept}
                multiple={multiple}
                className="sr-only"
                onChange={onChange}
                disabled={isUploading}
            />
        </div>
    );
}

function useUploadFilesInputProps(endpoint: keyof typeof routeRegistry) {
    const router = useRouter();
    const { user } = useUser();
    const posthog = usePostHog();

    const { isUploading, startUpload, routeConfig } = useUploadThing(endpoint, {
        onBeforeUploadBegin(files) {
            posthog.capture('upload_start', { userId: user?.id, name: user?.fullName });
            toast.loading(`Uploading ${files.length} file${files.length > 1 ? 's' : ''} ...`, {
                duration: 1000 * 60,
                id: 'uploading-files-toast',
            });
            return files;
        },
        onClientUploadComplete() {
            toast.dismiss('uploading-files-toast');
            router.refresh();
        },
        onUploadError(err) {
            toast.dismiss('uploading-files-toast');
            toast.error(
                <div className="text-red-500">Error during file uploading: {err.message}</div>,
                {
                    duration: 1000 * 5,
                },
            );
            console.log('upload error:', err);
        },
    });
    const { multiple, fileTypes } = generatePermittedFileTypes(routeConfig);
    const accept = fileTypes.map((type) => {
        if (type.includes('/')) {
            return type;
        }
        return type + '/*';
    });

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const selectedFiles = Array.from(e.target.files);
        const result = await startUpload(selectedFiles);

        console.log('uploaded files', result);
    }

    return {
        onChange: handleChange,
        accept: accept.join(','),
        multiple,
        isUploading,
    };
}

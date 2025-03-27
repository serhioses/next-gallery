'use client';

import { useRouter } from 'next/navigation';
import { generatePermittedFileTypes } from 'uploadthing/client';
import clsx from 'clsx';
import { UploadSVGIcon } from '~/components/CustomIcons';
import { routeRegistry, useUploadThing } from '~/utils/uploadthing';

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
    const { isUploading, startUpload, routeConfig } = useUploadThing(endpoint, {
        onBeforeUploadBegin(files) {
            console.log('onBeforeUploadBegin');
            return files;
        },
        onClientUploadComplete() {
            console.log('onClientUploadComplete');
            router.refresh();
        },
        onUploadError(err) {
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

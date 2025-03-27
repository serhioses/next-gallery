import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers,
} from '@uploadthing/react';

import { type OurFileRouter } from '~/app/api/uploadthing/core';

export const UploadButtonGenerated = generateUploadButton<OurFileRouter>();
export const UploadDropzoneGenerated = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, routeRegistry } = generateReactHelpers<OurFileRouter>();

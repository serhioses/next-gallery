import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';

import type { OurFileRouter } from '~/app/api/uploadthing/core';
import '@uploadthing/react/styles.css';

export const UploadButtonGenerated = generateUploadButton<OurFileRouter>();
export const UploadDropzoneGenerated = generateUploadDropzone<OurFileRouter>();

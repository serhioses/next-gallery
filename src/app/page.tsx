import { SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import { getMyImages } from '~/server/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    return (
        <main className="">
            <SignedOut>
                <div className="h-full w-full text-center text-2xl">Please sign in above</div>
            </SignedOut>
            <SignedIn>
                <Images />
            </SignedIn>
        </main>
    );
}

async function Images() {
    const images = await getMyImages();

    return (
        <div className="flex flex-wrap gap-4">
            {images.map((image) => {
                return (
                    <div key={image.id} className="relative flex h-48 w-48 flex-col">
                        <Image src={image.url} alt="" fill={true} />
                        <div>{image.name}</div>
                    </div>
                );
            })}
        </div>
    );
}

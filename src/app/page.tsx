import { SignedIn, SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
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

    if (!images.length) {
        return <p>No images yet</p>;
    }

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {images.map((image) => {
                return (
                    <div key={image.id} className="flex h-48 w-48 flex-col">
                        <Link href={`/img/${image.id}`} className="relative block h-full">
                            <Image
                                src={image.url}
                                alt=""
                                fill={true}
                                sizes="(min-width: 0px) 192px"
                            />
                        </Link>
                        <div className="truncate" title={image.name}>
                            {image.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { db } from '~/server/db';

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
    const images = await db.query.images.findMany({
        orderBy(fields, operators) {
            return operators.desc(fields.id);
        },
    });

    return (
        <div className="flex flex-wrap gap-4">
            {images.map((image) => {
                return (
                    <div key={image.id} className="flex w-48 flex-col">
                        <img src={image.url} alt="" />
                        <div>{image.name}</div>
                    </div>
                );
            })}
        </div>
    );
}

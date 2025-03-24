import { db } from '~/server/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const images = await db.query.images.findMany({
        orderBy(fields, operators) {
            return operators.desc(fields.id);
        },
    });

    return (
        <main className="">
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
        </main>
    );
}

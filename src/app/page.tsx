import { db } from '~/server/db';

const mockUrls = [
    'https://1rd1hl99eo.ufs.sh/f/emYfl2EusWQcQWebuynmxC4pJLFEw5VzuRPfatn0SWkAX12o',
    'https://1rd1hl99eo.ufs.sh/f/emYfl2EusWQcMYL4u8Qs4PxKrVkTSYQCl6bHzfcdJuE3MjhR',
    'https://1rd1hl99eo.ufs.sh/f/emYfl2EusWQcBtLOJWv6Rn8keyO5utG37qPEZdQ9oYADjizX',
    'https://1rd1hl99eo.ufs.sh/f/emYfl2EusWQcsqjgPwYUc7dOvNKnyCJ6TW34j1IPVioFqZwh',
    'https://1rd1hl99eo.ufs.sh/f/emYfl2EusWQcZrJKR99VXGP1U7tbpAuFTDjs9KISkZiMWhnL',
];

const mockImages = mockUrls.map((url, index) => {
    return { id: index + 1, url };
});

// TODO: See later if replacing with `dynamic = "force-dynamic"` suits better
export const revalidate = 300;

export default async function HomePage() {
    const posts = await db.query.posts.findMany();

    return (
        <main className="">
            <div className="flex flex-wrap gap-4">
                {posts.map((post) => {
                    return <div key={post.id}>{post.name}</div>;
                })}
                {mockImages.map((image) => {
                    return (
                        <div key={image.id} className="w-48">
                            <img src={image.url} alt="" />
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

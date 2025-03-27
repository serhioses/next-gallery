import { getImage } from '~/server/queries';

type TPageProps = {
    params: Promise<{ imageId: string }>;
};

export default async function Page(props: TPageProps) {
    const { imageId } = await props.params;
    const idAsNumber = Number(imageId);

    if (Number.isNaN(idAsNumber)) {
        throw new Error('Invalid image id');
    }

    const image = await getImage(idAsNumber);

    return (
        <div>
            <img src={image.url} alt="" className="w-96" />
        </div>
    );
}

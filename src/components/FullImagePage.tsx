import { getImage } from '~/server/queries';

type TFullImagePageProps = { imageId: number };

export async function FullImagePage(props: TFullImagePageProps) {
    const image = await getImage(props.imageId);

    return <img src={image.url} alt="" className="w-96" />;
}

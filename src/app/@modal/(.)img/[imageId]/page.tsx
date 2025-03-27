import { Modal } from '~/app/@modal/(.)img/[imageId]/modal';
import { FullImagePage } from '~/components/FullImagePage';

type TPageProps = {
    params: Promise<{ imageId: string }>;
};

export default async function Page(props: TPageProps) {
    const { imageId } = await props.params;
    const idAsNumber = Number(imageId);

    if (Number.isNaN(idAsNumber)) {
        throw new Error('Invalid image id');
    }

    return (
        <Modal>
            <FullImagePage imageId={idAsNumber} />
        </Modal>
    );
}

type TPageProps = {
    params: Promise<{ imageId: string }>;
};

export default async function Page(props: TPageProps) {
    const { imageId } = await props.params;
    return <div>{imageId}</div>;
}

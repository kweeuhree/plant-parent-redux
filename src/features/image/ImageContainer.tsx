type Props = {
  alt: string;
  src?: string;
  width?: string;
  height?: string;
};

const defaultImage =
  "https://i0.wp.com/unclejohnsplants.com/wp-content/uploads/woocommerce-placeholder.png?resize=300%2C300&ssl=1";

export const ImageContainer = ({ alt, src, width, height }: Props) => {
  return (
    <>
      {!src ? (
        <img alt="Failed to load" src={defaultImage} />
      ) : (
        <img alt={alt} src={src} width={width} height={height} />
      )}
    </>
  );
};

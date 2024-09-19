type Props = {
    alt: string,
    src: File | string | null,
}

const ImageContainer = ( {alt, src}: Props ) => {
  return (
    <>
    {
        !src ? (
            <img alt="Failed to load" src="https://www.drupal.org/files/drupal-media-colorbox-failed-to-load.png" />
        ) : (
            <img alt={alt} src={src} />
        )
    }
    </>
  )
}

export default ImageContainer;
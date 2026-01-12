import styles from './AppImage.module.scss';

interface AppImageProps {
  src: string;
  width?: string;
  height?: string;
  alt: string;
}

export const AppImage = (props: AppImageProps) => {
  const { src, height, width, alt } = props;
  return (
    <img
      className={styles.Img}
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

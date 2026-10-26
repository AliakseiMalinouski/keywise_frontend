import * as styles from './rating-cover.module.css';

type RatingCoverProps = {
  src: string;
  alt: string;
};

export function RatingCover({ src, alt }: RatingCoverProps) {
  return (
    <img
      className={styles.cover}
      src={src}
      alt={alt}
      width={460}
      height={215}
      loading="lazy"
      decoding="async"
    />
  );
}

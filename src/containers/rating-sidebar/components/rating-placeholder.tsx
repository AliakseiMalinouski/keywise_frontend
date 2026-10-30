import * as styles from './rating-placeholder.module.css';

type RatingPlaceholderProps = {
  message: string;
};

export function RatingPlaceholder({ message }: RatingPlaceholderProps) {
  return (
    <p className={styles.placeholder} role="status">
      {message}
    </p>
  );
}

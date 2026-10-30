import { TEXT } from '&constants';
import * as styles from './rating-header.module.css';

type RatingHeaderProps = {
  title?: string;
};

export function RatingHeader({ title }: RatingHeaderProps) {
  return (
    <header className={styles.header}>
      <p id="rating-sidebar-heading" className={styles.kicker}>
        {TEXT.ratingTitle}
      </p>
      {title && <h2 className={styles.title}>{title}</h2>}
    </header>
  );
}

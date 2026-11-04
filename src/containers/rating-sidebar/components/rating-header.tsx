import { TEXT } from '&constants';
import * as styles from './rating-header.module.css';

type RatingHeaderProps = {
  title?: string;
};

export function RatingHeader({ title }: RatingHeaderProps) {
  return (
    <header className={styles.header}>
      <h2 id="rating-sidebar-heading" className={styles.kicker}>
        {TEXT.ratingTitle}
      </h2>
      {title && <h3 className={styles.title}>{title}</h3>}
    </header>
  );
}

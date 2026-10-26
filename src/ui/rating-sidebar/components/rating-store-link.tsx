import { TEXT } from '../../../constants/text.ts';
import { steamStoreUrl } from '../rating-sidebar.utils.ts';
import * as styles from './rating-store-link.module.css';

type RatingStoreLinkProps = {
  appid: number;
};

export function RatingStoreLink({ appid }: RatingStoreLinkProps) {
  const href = steamStoreUrl(appid);

  return (
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {TEXT.ratingOpenSteam}
    </a>
  );
}

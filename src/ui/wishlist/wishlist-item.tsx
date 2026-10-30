import { memo } from 'react';

import type { WishlistGame } from '&network';
import { TEXT } from '&constants';
import * as styles from './wishlist-item.module.css';

type WishlistItemProps = {
  game: WishlistGame;
};

export const WishlistItem = memo(({ game }: WishlistItemProps) => {
  const title = game.title?.trim() || `App ${game.appid}`;
  const itemClassName = `${styles.item}${game.selected ? ` ${styles.selected}` : ''}`;

  return (
    <li className={itemClassName}>
      <a
        target="_blank"
        rel="noreferrer"
        className={styles.game}
        href={`https://store.steampowered.com/app/${game.appid}/`}
      >
        <span className={styles.name}>
          <span className={styles.title}>{title}</span>
          {game.selected && (
            <mark className={styles.badge}>{TEXT.selectedBadge}</mark>
          )}
        </span>
        <span className={styles.link}>{TEXT.wishlistOpen}</span>
      </a>
    </li>
  );
});

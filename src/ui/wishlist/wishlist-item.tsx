import { memo } from 'react';

import type { WishlistGame } from '../../api/search.types.ts';
import { TEXT } from '../../constants/text.ts';
import * as styles from './wishlist-item.module.css';

type WishlistItemProps = {
  game: WishlistGame;
};

export const WishlistItem = memo(({ game }: WishlistItemProps) => {
  const title = game.title?.trim() || `App ${game.appid}`;

  return (
    <li className={`${styles.item}${game.selected ? ` ${styles.selected}` : ''}`}>
      <a
        className={styles.game}
        href={`https://store.steampowered.com/app/${game.appid}/`}
        target="_blank"
        rel="noreferrer"
      >
        <span className={styles.name}>
          <span className={styles.title}>{title}</span>
          {game.selected ? (
            <span className={styles.badge}>{TEXT.selectedBadge}</span>
          ) : null}
        </span>
        <span className={styles.link}>{TEXT.wishlistOpen}</span>
      </a>
    </li>
  );
});

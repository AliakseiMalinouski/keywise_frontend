import { useState } from 'react';

import type { WishlistGame } from '../../api/search.types.ts';
import { TEXT } from '../../constants/text.ts';
import { WishlistHeader } from './wishlist-header.tsx';
import { WishlistItem } from './wishlist-item.tsx';
import { getWishlistItems } from './wishlist.utils.ts';
import * as styles from './wishlist.module.css';

type WishlistProps = {
  games: WishlistGame[];
};

export function Wishlist({ games }: WishlistProps) {
  const [open, setOpen] = useState(false);
  const { selected, items } = getWishlistItems(games);

  const hasItems = items.length > 0;
  const tone = selected ? styles.found : hasItems ? styles.missing : '';

  return (
    <article className={`${styles.card}${tone ? ` ${tone}` : ''}`}>
      <button
        type="button"
        aria-expanded={open}
        className={styles.toggle}
        aria-controls="wishlist-games"
        onClick={() => setOpen((value) => !value)}
      >
        <WishlistHeader
          count={games.length}
          selected={Boolean(selected)}
          open={open}
        />
      </button>

      {open && (
        <div id="wishlist-games">
          {!hasItems && (
            <p className={styles.empty}>{TEXT.wishlistEmpty}</p>
          )}
          {hasItems && (
            <ul className={styles.list}>
              {items.map((game) => (
                <WishlistItem key={game.appid} game={game} />
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

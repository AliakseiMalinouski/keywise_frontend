import { useMemo, useState } from 'react';

import type { WishlistGame } from '&network';
import { TEXT } from '&constants';
import { WishlistHeader } from './wishlist-header.tsx';
import { WishlistItem } from './wishlist-item.tsx';
import { getWishlistItems } from './wishlist.utils.ts';
import * as styles from './wishlist.module.css';

type WishlistProps = {
  games: WishlistGame[];
};

export function Wishlist({ games }: WishlistProps) {
  const [open, setOpen] = useState(false);
  const { selected, items } = useMemo(() => getWishlistItems(games), [games]);

  const hasItems = items.length > 0;
  const tone = selected ? styles.found : hasItems ? styles.missing : '';
  const cardClassName = `${styles.card}${tone ? ` ${tone}` : ''}`;

  return (
    <article className={cardClassName}>
      <button
        type="button"
        aria-expanded={open}
        className={styles.toggle}
        aria-controls="wishlist-games"
        onClick={() => setOpen((value) => !value)}
      >
        <WishlistHeader
          open={open}
          count={games.length}
          selected={Boolean(selected)}
        />
      </button>

      {open && (
        <section id="wishlist-games" aria-label={TEXT.wishlist}>
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
        </section>
      )}
    </article>
  );
}

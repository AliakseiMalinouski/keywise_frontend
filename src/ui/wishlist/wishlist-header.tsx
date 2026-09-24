import { useMemo } from 'react';

import { TEXT } from '../../constants/text.ts';
import { getGamesCount } from './wishlist.utils.ts';
import * as styles from './wishlist-header.module.css';

type WishlistHeaderProps = {
  count: number;
  selected: boolean;
  open: boolean;
};

const DIVIDER = ' · ';

export function WishlistHeader({ count, selected, open }: WishlistHeaderProps) {
  const { hasItems, gamesCount } = useMemo(() => ({
    hasItems: count > 0,
    gamesCount: getGamesCount(count)
  }), [count]);

  const arrowClassName = `${styles.arrow}${open ? ` ${styles.arrowOpen}` : ''}`;

  return (
    <>
      <span className={styles.header}>
        <span className={styles.kicker}>{TEXT.wishlist}</span>
        <span className={styles.meta}>
          {gamesCount}
          {hasItems && (
            <>
              {DIVIDER}
              <span className={selected ? styles.found : styles.missing}>
                {selected ? TEXT.wishlistSelected : TEXT.wishlistMissing}
              </span>
            </>
          )}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={arrowClassName}
      />
      <span className={styles.srOnly}>
        {open ? TEXT.wishlistCollapse : TEXT.wishlistExpand}
      </span>
    </>
  );
}

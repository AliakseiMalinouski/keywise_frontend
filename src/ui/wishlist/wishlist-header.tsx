import { TEXT } from '../../constants/text.ts';
import { gamesCount } from './wishlist.utils.ts';
import * as styles from './wishlist-header.module.css';

type WishlistHeaderProps = {
  count: number;
  selected: boolean;
  open: boolean;
};

export function WishlistHeader({ count, selected, open }: WishlistHeaderProps) {
  return (
    <>
      <span className={styles.header}>
        <span className={styles.kicker}>{TEXT.wishlist}</span>
        <span className={styles.meta}>
          {gamesCount(count)}
          {count > 0 && (
            <>
              {' · '}
              <span className={selected ? styles.found : styles.missing}>
                {selected ? TEXT.wishlistSelected : TEXT.wishlistMissing}
              </span>
            </>
          )}
        </span>
      </span>
      <span
        className={`${styles.arrow}${open ? ` ${styles.arrowOpen}` : ''}`}
        aria-hidden="true"
      />
      <span className={styles.srOnly}>
        {open ? TEXT.wishlistCollapse : TEXT.wishlistExpand}
      </span>
    </>
  );
}

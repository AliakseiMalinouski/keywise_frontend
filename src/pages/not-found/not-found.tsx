import { Link } from 'react-router-dom';

import { TEXT } from '&constants';

import * as styles from './not-found.module.css';

export function NotFound() {
  return (
    <main className={styles.page}>
      <article className={styles.card}>
        <p className={styles.kicker}>{TEXT.brand}</p>
        <p className={styles.code} aria-hidden>
          {TEXT.notFoundCode}
        </p>
        <h1 className={styles.title}>{TEXT.notFoundTitle}</h1>
        <p className={styles.lead}>{TEXT.notFoundLead}</p>
        <nav className={styles.links} aria-label={TEXT.siteNavLabel}>
          <Link className={styles.homeLink} to="/">
            {TEXT.notFoundHome}
          </Link>
          <Link className={styles.secondaryLink} to="/about/">
            {TEXT.notFoundAbout}
          </Link>
        </nav>
      </article>
    </main>
  );
}

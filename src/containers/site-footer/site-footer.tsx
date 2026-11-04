import { Link } from 'react-router-dom';

import { DATA_SOURCES, TEXT } from '&constants';

import * as styles from './site-footer.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label={TEXT.footerNavLabel}>
        <Link className={styles.link} to="/">
          {TEXT.footerHome}
        </Link>
        <span className={styles.sep} aria-hidden>
          ·
        </span>
        <a className={styles.link} href="#intro-heading">
          {TEXT.footerHowItWorks}
        </a>
      </nav>
      <p className={styles.sources}>
        {TEXT.footerSources}{' '}
        {DATA_SOURCES.map((source, index) => (
          <span key={source.href}>
            {index > 0 ? ', ' : null}
            <a
              className={styles.link}
              href={source.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.name}
            </a>
          </span>
        ))}
        .
      </p>
    </footer>
  );
}

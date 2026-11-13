import { ALTERNATIVE_TO, DATA_SOURCES, TEXT, VIBED_MARKET } from '&constants';
import { SiteNav } from '&containers/site-nav';

import * as styles from './site-footer.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <h2 className={styles.sectionHeading}>{TEXT.footerSectionHeading}</h2>
      <h3 className={styles.subheading}>{TEXT.footerNavHeading}</h3>
      <SiteNav className={styles.nav} />
      <h3 className={styles.subheading}>{TEXT.footerSourcesHeading}</h3>
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
      <p className={styles.bottom}>
        <a
          className={styles.link}
          href={VIBED_MARKET.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {TEXT.footerVibedMarket}
        </a>
        <span className={styles.sep} aria-hidden>
          ·
        </span>
        <a
          className={styles.link}
          href={ALTERNATIVE_TO.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {TEXT.footerAlternativeTo}
        </a>
      </p>
    </footer>
  );
}

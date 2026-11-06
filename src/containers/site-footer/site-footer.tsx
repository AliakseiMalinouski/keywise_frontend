import { DATA_SOURCES, TEXT } from '&constants';
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
    </footer>
  );
}

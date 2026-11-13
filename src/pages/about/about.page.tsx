import { Link } from 'react-router-dom';

import { TEXT } from '&constants';
import { SiteIntroSections } from '&containers/site-intro';
import { SiteFooter } from '&containers/site-footer';
import { SiteNav } from '&containers/site-nav';

import * as styles from './about.page.module.css';

export function AboutPage() {
  return (
    <div className={styles.layout}>
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.kicker}>{TEXT.brand}</p>
          <SiteNav className={styles.siteNav} />
          <h1 id="about-title" className={styles.title}>
            {TEXT.aboutTitle}
          </h1>
          <p className={styles.lead}>{TEXT.aboutLead}</p>
          <p className={styles.backLinkWrap}>
            <Link className={styles.backLink} to="/">
              {TEXT.aboutSearchLink}
            </Link>
          </p>
        </header>

        <section className={styles.content} aria-labelledby="about-title">
          <h2 className={styles.contentHeading}>{TEXT.introHeading}</h2>
          <article className={styles.article}>
            <SiteIntroSections />
          </article>
        </section>
      </main>

      <SiteFooter nav={<SiteNav />} />
    </div>
  );
}

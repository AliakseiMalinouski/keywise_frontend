import { TEXT } from '&constants';
import { SiteIntroSections } from '&containers/site-intro';
import { SiteFooter } from '&containers/site-footer';

import * as styles from './about.page.module.css';

export function AboutPage() {
  return (
    <div className={styles.layout}>
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.kicker}>{TEXT.brand}</p>
          <h1 id="about-title" className={styles.title}>
            {TEXT.aboutTitle}
          </h1>
          <p className={styles.lead}>{TEXT.aboutLead}</p>
        </header>

        <section className={styles.content} aria-labelledby="about-title">
          <h2 className={styles.contentHeading}>{TEXT.introHeading}</h2>
          <article className={styles.article}>
            <SiteIntroSections />
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

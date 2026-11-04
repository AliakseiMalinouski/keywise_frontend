import { TEXT } from '&constants';

import * as styles from './site-intro.module.css';

function IntroChevron() {
  return (
    <svg
      className={styles.chevronIcon}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteIntro() {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <h2 id="intro-heading" className={styles.heading}>
          {TEXT.introHeading}
        </h2>
        <span className={styles.chevron}>
          <IntroChevron />
        </span>
      </summary>
      <div className={styles.panel}>
        <div className={styles.panelInner}>
          <div className={styles.body}>
            {TEXT.introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}

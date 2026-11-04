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

function IntroNote({
  depth,
  heading,
  text,
}: {
  depth: 4 | 5 | 6;
  heading: string;
  text: string;
}) {
  const HeadingTag = depth === 4 ? 'h4' : depth === 5 ? 'h5' : 'h6';
  const headingClass =
    depth === 4
      ? styles.noteHeading4
      : depth === 5
        ? styles.noteHeading5
        : styles.noteHeading6;

  return (
    <div className={styles.noteBlock}>
      <HeadingTag className={headingClass}>{heading}</HeadingTag>
      <p className={styles.noteText}>{text}</p>
    </div>
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
            {TEXT.introSections.map((section) => (
              <section key={section.heading} className={styles.section}>
                <h3 className={styles.sectionHeading}>{section.heading}</h3>
                <p className={styles.paragraph}>{section.text}</p>
                {'notes' in section &&
                  section.notes?.map((note, index) => (
                    <IntroNote
                      key={note.heading}
                      depth={(index + 4) as 4 | 5 | 6}
                      heading={note.heading}
                      text={note.text}
                    />
                  ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}

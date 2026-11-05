import { TEXT } from '&constants';

import * as styles from './site-intro.module.css';

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

export function SiteIntroSections() {
  return (
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
  );
}

import * as styles from '../idle-map.module.css';

type IdleMapCaptionProps = {
  text: string;
};

export function IdleMapCaption({ text }: IdleMapCaptionProps) {
  return <figcaption className={styles.caption}>{text}</figcaption>;
}

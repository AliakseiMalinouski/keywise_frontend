import { useId, useState, type MouseEvent, type ReactNode } from 'react';

import * as styles from './accordion.module.css';

type AccordionProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  tone?: 'default' | 'inverse';
};

export function Accordion({
  label,
  children,
  className,
  ariaLabel,
  tone = 'default',
}: AccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootClassName =
    tone === 'inverse'
      ? `${styles.root} ${styles.rootInverse}${className ? ` ${className}` : ''}`
      : `${styles.root}${className ? ` ${className}` : ''}`;
  const arrowClassName = `${styles.arrow}${open ? ` ${styles.arrowOpen}` : ''}`;
  const panelClassName = open ? `${styles.panel} ${styles.panelOpen}` : styles.panel;

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setOpen((value) => !value);
  }

  return (
    <section className={rootClassName} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={handleToggle}
      >
        <span className={styles.label}>{label}</span>
        <span aria-hidden className={arrowClassName} />
      </button>
      <div
        id={panelId}
        className={panelClassName}
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.inner}>{children}</div>
      </div>
    </section>
  );
}

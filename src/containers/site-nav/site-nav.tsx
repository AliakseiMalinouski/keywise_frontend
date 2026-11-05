import { Link, useLocation } from 'react-router-dom';

import { TEXT } from '&constants';

import * as styles from './site-nav.module.css';

type SiteNavProps = {
  className?: string;
};

function isAboutPath(pathname: string) {
  return pathname === '/about' || pathname === '/about/';
}

export function SiteNav({ className }: SiteNavProps) {
  const { pathname } = useLocation();
  const navClassName = className ? `${styles.nav} ${className}` : styles.nav;
  const onHome = pathname === '/' || pathname === '';
  const onAbout = isAboutPath(pathname);

  return (
    <nav className={navClassName} aria-label={TEXT.siteNavLabel}>
      <Link
        className={styles.link}
        to="/"
        aria-current={onHome ? 'page' : undefined}
      >
        {TEXT.footerHome}
      </Link>
      <span className={styles.sep} aria-hidden>
        ·
      </span>
      <Link
        className={styles.link}
        to="/about/"
        aria-current={onAbout ? 'page' : undefined}
      >
        {TEXT.footerAbout}
      </Link>
    </nav>
  );
}

import { STATUS, type Status } from '../../constants/status.ts';
import * as styles from './status-message.module.css';

type StatusMessageProps = {
  kind: Status;
  children: string;
};

export function StatusMessage({ kind, children }: StatusMessageProps) {
  return (
    <p
      className={`${styles.message} ${styles[kind]}`}
      role={kind === STATUS.error ? 'alert' : 'status'}
    >
      {children}
    </p>
  );
}

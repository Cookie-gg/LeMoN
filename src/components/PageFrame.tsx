import { memo, ReactElement } from 'react';
import styles from '../assets/scss/components/PageFrame.module.scss';

function PageFrame({ children, className }: { children: ReactElement; className?: string }) {
  return <div className={`${styles.entire} ${className}`}>{children}</div>;
}

export default memo(PageFrame);

import { memo, ReactElement } from 'react';
import styles from '../assets/scss/components/ImageFrame.module.scss';

function ImageFrame({ className, children }: { className: string; children: ReactElement }) {
  return <div className={`${styles.entire} ${className}`}>{children}</div>;
}

export default memo(ImageFrame);

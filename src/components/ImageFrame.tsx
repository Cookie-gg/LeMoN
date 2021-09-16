import { ReactElement } from 'react';
import styles from '../assets/scss/components/ImageFrame.module.scss';

export default function ImageFrame({ className, children }: { className: string; children: ReactElement }) {
  return <div className={`${styles.entire} ${className}`}>{children}</div>;
}

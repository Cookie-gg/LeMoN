import { ReactElement } from 'react';
import styles from '../assets/scss/components/SvgFrame.module.scss';
export default function SvgFrame({
  className,
  children,
}: {
  className: string;
  children: ReactElement;
}) {
  return <div className={`${styles.entire} ${className}`}>{children}</div>;
}

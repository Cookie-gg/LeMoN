import { ElementType } from 'react';
import styles from '../assets/scss/components/Title.module.scss';
export default function Title({
  rank,
  text,
  className,
}: {
  rank: number;
  text: string;
  className?: string;
}) {
  const Tag = `h${rank}` as ElementType;
  return (
    <Tag className={`${className} ${styles.entire}`}>
      <span className={styles.text}>{text}</span>
    </Tag>
  );
}

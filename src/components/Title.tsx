import { ReactElement } from 'react';
import styles from '../assets/scss/components/Title.module.scss';
export default function Title({
  rank,
  text,
  className,
  children,
}: {
  rank: number;
  text?: string;
  className?: string;
  children: ReactElement;
}) {
  const Tag = `h${rank}` as React.ElementType;
  return (
    <Tag className={`${className} ${styles.entire}`}>
      <span className={text ? styles.text : styles.svg}>
        {text ? (
          <span>{text}</span>
        ) : (
          <>
            {children}
            {children}
          </>
        )}
      </span>
    </Tag>
  );
}

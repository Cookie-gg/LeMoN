import { ReactElement } from 'react';
import styles from '../assets/scss/components/NamePlate.module.scss';
export default function NamePlate({
  rank,
  text,
  className,
  children,
}: {
  rank: number;
  text?: string;
  className?: string;
  children?: ReactElement;
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

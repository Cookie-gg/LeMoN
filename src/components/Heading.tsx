import { memo } from 'react';
import styles from '../assets/scss/components/Heading.module.scss';

interface PropsType {
  rank: number;
  text: string;
  className?: string;
  id?: string;
}

function Heading({ rank, text, className, id }: PropsType) {
  const Tag = `h${rank}` as React.ElementType;
  return (
    <Tag className={`${styles.entire} ${className}`} id={id}>
      <span>{text}</span>
    </Tag>
  );
}

export default memo(Heading);

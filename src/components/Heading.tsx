import { memo } from 'react';
import { compare } from 'utils/common';
import styles from '../assets/scss/components/Heading.module.scss';

interface PropsType {
  rank: number;
  text: string;
  className?: string;
}

function Heading({ rank, text, className }: PropsType) {
  const Tag = `h${rank}` as React.ElementType;
  return (
    <Tag className={`${styles.entire} ${className}`}>
      <span>{text}</span>
    </Tag>
  );
}

export default memo(Heading, (prev: PropsType, next: PropsType) => compare<PropsType>(prev, next));

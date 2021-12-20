import { ForwardedRef, forwardRef, memo, ElementType } from 'react';
import styles from '../assets/scss/components/Heading.module.scss';

interface PropsType {
  rank: number;
  text: string;
  className?: string;
  id?: string;
}

function Heading({ rank, text, className, id }: PropsType, ref: ForwardedRef<HTMLElement>) {
  const Tag = `h${rank}` as ElementType;
  return (
    <Tag className={`${styles.entire} ${className}`} id={id} ref={ref}>
      <span>{text}</span>
    </Tag>
  );
}

export default memo(forwardRef<HTMLElement, PropsType>(Heading));

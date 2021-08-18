import { compare } from 'utils/common';
import { memo, Fragment as _ } from 'react';
import styles from '../assets/scss/components/Paragraph.module.scss';

interface PropsType {
  text: string;
  className?: string;
}

function Paragraph({ text, className }: PropsType) {
  const replacedText = text.split(/(\n)/).map((el) => {
    return <_ key={el}>{el.match(/\n/) ? <br /> : el}</_>;
  });
  return (
    <p className={`${className} ${styles.entire}`}>
      <span>{replacedText}</span>
    </p>
  );
}

export default memo(Paragraph, (prev: PropsType, next: PropsType) => compare(prev, next));

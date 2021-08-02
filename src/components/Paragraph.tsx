import React from 'react';
import styles from '../assets/scss/components/Paragraph.module.scss';
export default function Paragraph({ text, className }: { text: string; className?: string }) {
  const replacedText = text.split(/(\n)/).map((el) => {
    return <React.Fragment key={el}>{el.match(/\n/) ? <br /> : el}</React.Fragment>;
  });
  return (
    <p className={`${className} ${styles.entire}`}>
      <span>{replacedText}</span>
    </p>
  );
}

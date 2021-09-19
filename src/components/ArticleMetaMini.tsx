import { RefObject } from 'react';
import { Twemoji } from 'react-emoji-render';
import styles from '../assets/scss/components/ArticleMetaMini.module.scss';

export default function ArticleMetaMini({
  meta,
  isIntersecting,
  className,
  _height,
}: {
  meta: { emoji: string; title: string };
  className?: string;
  isIntersecting?: boolean;
  _height?: RefObject<HTMLDivElement>;
}) {
  return (
    <div className={`${styles.entire} ${className} ${isIntersecting && styles.showed}`} ref={_height}>
      <Twemoji svg onlyEmojiClassName={styles.emoji} text={meta.emoji} options={{ protocol: 'https' }} />
      <h1 className={styles.title}>{meta.title}</h1>
    </div>
  );
}

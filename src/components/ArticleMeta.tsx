import { RefObject } from 'react';
import { displayDate } from 'utils/common';
import { Twemoji } from 'react-emoji-render';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleMeta.module.scss';

interface PropsType {
  type: 'main' | 'aside';
  emoji: string;
  title: string;
  releaseDate: Date;
  updateDate?: Date;
  scrollTop?: number;
  top?: number;
  paddingTop?: number;
  _height?: RefObject<HTMLDivElement>;
}

export default function ArticleMeta({
  type,
  emoji,
  title,
  releaseDate,
  updateDate,
  scrollTop,
  top,
  paddingTop,
  _height,
}: PropsType) {
  return (
    <div
      className={`${
        type === 'main'
          ? styles.main
          : styles.aside + ` ${(scrollTop as number) > (top as number) - (paddingTop as number) && styles.show}`
      }`}
      ref={_height}
    >
      <Twemoji svg onlyEmojiClassName={styles.emoji} text={emoji} options={{ protocol: 'https' }} />
      <h1 className={styles.title}>{title}</h1>
      {type === 'main' && (
        <div className={styles.time_header}>
          <span className={styles.release_date}>
            <Iconify icon={'fa-solid:calendar-day'} />
            <time>{displayDate(new Date(releaseDate), '.')}</time>
          </span>
          {updateDate && (
            <span className={styles.update_date}>
              <Iconify icon={'fa-solid:sync'} />
              <time>{displayDate(new Date(releaseDate), '.')}</time>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

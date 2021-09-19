import { displayDate } from 'utils/common';
import { Twemoji } from 'react-emoji-render';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleMeta.module.scss';

interface PropsType {
  emoji: string;
  title: string;
  releaseDate: Date;
  updateDate: Date;
}

export default function ArticleMeta({ emoji, title, releaseDate, updateDate }: PropsType) {
  return (
    <div className={styles.entire}>
      <Twemoji svg onlyEmojiClassName={styles.emoji} text={emoji} options={{ protocol: 'https' }} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.time_header}>
        <div className={styles.release_date}>
          <Iconify icon={'fa-solid:calendar-day'} />
          <time>{displayDate(new Date(releaseDate), '.')}</time>
        </div>
        <div className={styles.update_date}>
          <Iconify icon={'fa-solid:sync'} />
          <time>{displayDate(new Date(updateDate), '.')}</time>
        </div>
      </div>
    </div>
  );
}

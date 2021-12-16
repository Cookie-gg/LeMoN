import { displayDate } from 'utils/common';
import { Twemoji } from 'react-emoji-render';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleMeta.module.scss';
import { memo } from 'react';

interface PropsType {
  emoji: string;
  title: string;
  published: boolean;
  releaseDate: Date;
  updateDate: Date;
}

function ArticleMeta({ emoji, title, published, releaseDate, updateDate }: PropsType) {
  return (
    <div className={styles.entire}>
      <Twemoji svg onlyEmojiClassName={styles.emoji} text={emoji} options={{ protocol: 'https' }} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.time_header}>
        {!published && (
          <div className={styles.publish_state}>
            <Iconify icon="ic:round-public-off" />
            Not Published
          </div>
        )}
        <div className={styles.release_date}>
          <Iconify icon="fa-solid:calendar-day" />
          <time>{displayDate(new Date(releaseDate), '.', false)}</time>
        </div>
        <div className={styles.update_date}>
          <Iconify icon="fa-solid:sync" />
          <time>{displayDate(new Date(updateDate), '.', false)}</time>
        </div>
      </div>
    </div>
  );
}

export default memo(ArticleMeta);

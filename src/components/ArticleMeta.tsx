import { displayDate, encodeEmoji } from 'utils/common';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleMeta.module.scss';
import { memo } from 'react';
import EmojiSvg from './EmojiSvg';

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
      <EmojiSvg unicode={encodeEmoji(emoji)} className={styles.emoji} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.time_header}>
        {!published && (
          <div className={styles.publish_state}>
            <Iconify fr={''} icon="ic:round-public-off" />
            Not Published
          </div>
        )}
        <div className={styles.release_date}>
          <Iconify fr={''} icon="fa-solid:calendar-day" />
          <time>{displayDate(new Date(releaseDate), '.', false)}</time>
        </div>
        <div className={styles.update_date}>
          <Iconify fr={''} icon="fa-solid:sync" />
          <time>{displayDate(new Date(updateDate), '.', false)}</time>
        </div>
      </div>
    </div>
  );
}

export default memo(ArticleMeta);

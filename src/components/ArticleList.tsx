import { EmojiSvg, Nlink } from 'components';
import { Zenn } from 'types/common';
import { memo, ReactElement } from 'react';
import { displayDate, encodeEmoji } from 'utils/common';
import styles from '../assets/scss/components/ArticleList.module.scss';
import Slider, { Settings } from 'react-slick';
import { Icon as Iconify } from '@iconify/react';

interface PropsType {
  className?: string;
  id?: string;
  data: Zenn[];
  shiftList?: ReactElement;
  pushList?: ReactElement;
  vertical?: boolean;
  horizontal?: boolean;
  slider?: boolean;
  settings?: Settings;
  editable?: boolean;
  type?: 'public' | 'private';
}

function ArticleList({
  className,
  id,
  data,
  shiftList,
  pushList,
  vertical,
  horizontal,
  slider,
  settings,
  editable,
  type,
}: PropsType) {
  const listBody = data.specifor(
    data.length,
    (value: Zenn) =>
      (type ? (type === 'public' ? value.published : !value.published) : true) && (
        <li key={value.articleId}>
          <Nlink
            href={editable ? '/edit/[...id]' : '/blog/[...id]'}
            as={editable ? `/edit/${value.articleId}` : `/blog/${value.articleId}`}
          >
            <>
              <div className={styles.thumbnail}>
                {vertical && <span className={styles.type}>{value.type.toUpperCase()}</span>}
                <EmojiSvg unicode={encodeEmoji(value.emoji)} className={styles.emoji} />
              </div>
              <div className={styles.text_wrapper}>
                <h2>
                  {!value.published && <Iconify fr={''} icon="ic:round-public-off" />}
                  {value.title}
                </h2>
                <div>
                  <time>{displayDate(new Date(value.releaseDate))}</time>
                  <p>
                    {value.topics.specifor(
                      horizontal ? 3 : 2,
                      (topic: string) => topic && <span key={topic}>{topic}</span>,
                    )}
                  </p>
                </div>
              </div>
            </>
          </Nlink>
        </li>
      ),
  );
  return (
    <>
      <ul
        className={`${styles.articles} ${vertical && styles.vertical} ${horizontal && styles.horizontal} ${
          slider && styles.slider
        } ${className}`}
        id={id}
      >
        {shiftList}
        {slider && data.length > 2 ? <Slider {...settings}>{listBody}</Slider> : listBody}
        {pushList}
      </ul>
    </>
  );
}

export default memo(
  ArticleList,
  (prev, next) =>
    JSON.stringify(prev.data) === JSON.stringify(next.data) &&
    prev.shiftList === next.shiftList &&
    prev.pushList === next.pushList,
);

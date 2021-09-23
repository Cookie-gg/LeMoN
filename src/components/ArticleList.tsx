import { Zenn } from 'types/common';
import { memo, ReactElement } from 'react';
import { compare, displayDate } from 'utils/common';
import { Twemoji } from 'react-emoji-render';
import styles from '../assets/scss/components/ArticleList.module.scss';
import { Link } from 'utils/next';

interface PropsType {
  type?: 'latest' | 'related';
  className: string;
  data: Zenn[];
  display: number;
  shiftList?: ReactElement;
  pushList?: ReactElement;
  needDateParse?: boolean;
}

function ArticleList({ type, className, data, display, shiftList, pushList }: PropsType) {
  const displayTopics = type ? 2 : 5;
  const listBody = (value: Zenn, i: number) => (
    <li key={i}>
      <Link href="/blog/[...id]" as={`/blog/${value.id}`}>
        <a>
          <div className={styles.thumbnail}>
            {type && <span className={styles.type}>{value.type.toUpperCase()}</span>}
            <Twemoji svg className={styles.emoji} text={value.emoji} options={{ protocol: 'https' }} />
          </div>
          <div className={styles.text_wrapper}>
            <h2>{value.title}</h2>
            <div>
              <time>{displayDate(new Date(value.releaseDate))}</time>
              <p>
                {value.topics.specifor(
                  displayTopics,
                  (topic: string, i: number) => topic && <span key={i}>{topic}</span>,
                )}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
  return (
    <>
      <ul className={`${styles.articles} ${type ? styles.vertical : styles.horizontal} ${className}`}>
        {shiftList}
        {data.specifor(display, (value: Zenn, i: number) => listBody(value, i))}
        {pushList}
      </ul>
    </>
  );
}

export default memo(ArticleList, (prev, next) => prev.display === next.display && compare(prev.data, next.data));

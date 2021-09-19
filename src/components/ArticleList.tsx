import { useMount } from 'hooks';
import { Zenn } from 'types/common';
import { ReactElement } from 'react';
import { displayDate } from 'utils/common';
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

export default function ArticleList({ type, className, data, display, shiftList, pushList }: PropsType) {
  const isMouted = useMount();
  const displayTopics = type ? 2 : 5;
  const listBody = (value: Zenn, i: number) => (
    <li key={i}>
      <Link href={`/blog/${value.id}`}>
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
      <ul
        className={`${styles.articles} ${type ? styles.vertical : styles.horizontal} ${className} ${
          isMouted && styles.mounted
        }`}
      >
        {shiftList}
        {data.specifor(display as number, (value: Zenn, i: number) => listBody(value, i))}
        {pushList}
      </ul>
    </>
  );
}

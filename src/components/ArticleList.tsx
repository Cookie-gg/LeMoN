import { useMount } from 'hooks';
import { Nlink } from 'components';
import { Zenn } from 'types/common';
import { Twemoji } from 'react-emoji-render';
import { displayDate } from 'utils/common';
import styles from '../assets/scss/components/ArticleList.module.scss';

interface PropsType {
  type?: 'latest' | 'related';
  className: string;
  data: Zenn[];
  displayNum?: number;
}

export default function ArticleList({ type, className, data, displayNum }: PropsType) {
  const isMouted = useMount();
  const displayTopics = type ? 2 : 5;
  const listBody = (value: Zenn, i: number) => (
    <li key={i}>
      <Nlink href={`/blog/${value.id}`}>
        <>
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
        </>
      </Nlink>
    </li>
  );
  return (
    <ul
      className={`${styles.articles} ${type ? styles.vertical : styles.horizontal} ${className} ${
        isMouted && styles.mounted
      }`}
    >
      {type
        ? data.map((value: Zenn, i: number) => listBody(value, i))
        : data.specifor(displayNum as number, (value: Zenn, i: number) => listBody(value, i))}
    </ul>
  );
}

import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleTopics.module.scss';

interface PropsType {
  type: string;
  topics: string[];
  icons: string[];
}

export default function ArticleTopics({ type, topics, icons }: PropsType) {
  return (
    <div className={styles.entire}>
      <div className={styles.title}>TOPICS</div>
      <ul className={styles.body}>
        {topics.map((value: string, i: number) => (
          <li key={i}>
            <span>
              <Iconify icon={icons[i]} />
            </span>
            {value}
          </li>
        ))}
        <li>
          <span>
            <Iconify icon={icons[icons.length - 1]} />
          </span>
          {type.slice(0, 1).toUpperCase() + type.slice(1)}
        </li>
      </ul>
    </div>
  );
}

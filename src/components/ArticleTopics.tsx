import { Link } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleTopics.module.scss';
import { memo } from 'react';

interface PropsType {
  type?: string;
  topics: string[];
  icons: string[];
  inArticle?: boolean;
  className?: string;
  activeNumber?: number;
  clickEvent?: (n: number) => void;
}

function ArticleTopics({ type, topics, icons, inArticle = false, className, activeNumber, clickEvent }: PropsType) {
  const Tag = inArticle ? 'div' : 'li';
  return (
    <Tag className={`${styles.entire} ${inArticle && styles.in_article} ${className}`}>
      {inArticle && <div className={styles.title}>TOPICS</div>}
      <ul className={styles.body}>
        {topics.map((value: string, i: number) => (
          <li
            key={i}
            className={`${activeNumber === i && styles.active}`}
            onClick={() => !inArticle && (clickEvent as (n: number) => void)(i)}
          >
            {inArticle ? (
              <Link href={`/topics/${value.toLowerCase()}`}>
                <a>
                  <span>
                    <Iconify
                      icon={icons[i].slice(0, 1) === '_' ? icons[i].slice(1) : icons[i]}
                      style={{ filter: `${icons[i].slice(0, 1) === '_' && 'invert()'}` }}
                    />
                  </span>
                  {value}
                </a>
              </Link>
            ) : (
              <>
                <span>
                  <Iconify
                    icon={icons[i].slice(0, 1) === '_' ? icons[i].slice(1) : icons[i]}
                    style={{ filter: `${icons[i].slice(0, 1) === '_' && 'invert()'}` }}
                  />
                </span>
                {value}
              </>
            )}
          </li>
        ))}
        {inArticle ? (
          <li>
            <Link href="/blog/topics">
              <a>
                <span>
                  <Iconify icon={icons[icons.length - 1]} />
                </span>
                {(type as string).slice(0, 1).toUpperCase() + (type as string).slice(1)}
              </a>
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/blog/topics">
              <a>
                <span>
                  <Iconify icon={'fa-solid:arrow-right'} />
                </span>
                トピックごとに表示
              </a>
            </Link>
          </li>
        )}
      </ul>
    </Tag>
  );
}

export default memo(ArticleTopics, (prev, next) => prev.activeNumber === next.activeNumber);

import { memo } from 'react';
import { Nlink } from 'components';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/ArticleTopics.module.scss';

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
            key={value}
            className={`${activeNumber === i && styles.active}`}
            onClick={() => !inArticle && clickEvent && clickEvent(i)}
          >
            {inArticle ? (
              <Nlink href={`/blog/topics#${value.toLowerCase()}`}>
                <>
                  <span>
                    <Iconify
                      icon={icons[i].slice(0, 1) === '_' ? icons[i].slice(1) : icons[i]}
                      style={{ filter: `${icons[i].slice(0, 1) === '_' && 'invert()'}` }}
                    />
                  </span>
                  {value}
                </>
              </Nlink>
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
            <Nlink href="/blog/topics">
              <>
                <span>
                  <Iconify icon={icons[icons.length - 1]} />
                </span>
                {type}
              </>
            </Nlink>
          </li>
        ) : (
          <li>
            <Nlink href="/blog/topics">
              <>
                <span>
                  <Iconify icon={'fa-solid:arrow-right'} />
                </span>
                全て表示
              </>
            </Nlink>
          </li>
        )}
      </ul>
    </Tag>
  );
}

export default memo(ArticleTopics, (prev, next) => prev.activeNumber === next.activeNumber);

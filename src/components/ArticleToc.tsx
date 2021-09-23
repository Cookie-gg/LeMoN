import { Link } from 'utils/next';
import { memo, useRef, useState } from 'react';
import { Twemoji } from 'react-emoji-render';
import { Icon as Iconify } from '@iconify/react';
import { useFirstPeriod, useHeight, useIntersect, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/ArticleToc.module.scss';

interface PropsType {
  meta: {
    title: string;
    emoji: string;
  };
  headings?: {
    level: 1 | 2;
    text: string;
  }[];
  activeSection: number;
}

function ArticleToc({ meta, activeSection, headings }: PropsType) {
  const paddingTop = 151;
  const paddingBottom = 81;
  const initTransition = useFirstPeriod(0);
  const tocRef = useRef<HTMLDivElement>(null);
  const [isOpened, _isOpened] = useState(false);
  const [height, _height] = useHeight<HTMLDivElement>();
  const window = useWindowDimensions() as { width: number; height: number };
  const isIntersecting = useIntersect(tocRef.current, `0px 0px -${window.height - paddingTop}px`);
  return (
    <div
      className={`${styles.entire} ${isIntersecting && styles.showed} ${initTransition && styles.init}`}
      ref={tocRef}
    >
      <div className={styles.meta} ref={_height}>
        <Twemoji svg onlyEmojiClassName={styles.emoji} text={meta.emoji} options={{ protocol: 'https' }} />
        <h1 className={styles.title}>{meta.title}</h1>
      </div>
      <div
        className={`${styles.toc} ${isOpened && styles.opened}`}
        style={{
          maxHeight: `calc(100vh - ${paddingTop + paddingBottom + height}px)`,
          top: window.width < 1200 ? undefined : isIntersecting ? `${1 * height}px` : '0px',
        }}
      >
        <div className={styles.title} onClick={() => _isOpened((prev) => !prev)}>
          目次
          {window.width < 1200 && <Iconify icon="ri:menu-fold-fill" />}
        </div>
        {headings && (
          <ul className={styles.body}>
            {headings.map((heading, i) => (
              <Link href={`#${encodeURI(heading.text)}`} key={i}>
                <li
                  className={`${activeSection === i && styles.active} ${
                    heading.level === 1 ? styles.heading_1 : styles.heading_2
                  }`}
                >
                  {heading.text}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default memo(ArticleToc);

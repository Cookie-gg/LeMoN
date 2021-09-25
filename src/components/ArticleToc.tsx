import { Link } from 'utils/next';
import { memo, MouseEvent, useRef, useState } from 'react';
import { Twemoji } from 'react-emoji-render';
import { useAgent, useFirstPeriod, useHeight, useIntersect, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/ArticleToc.module.scss';
import { useSwipeable } from 'react-swipeable';

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
  const [cursorY, _cursorY] = useState(0);
  const swipeOptions = useSwipeable({
    onSwipedRight: () => _isOpened(false),
    onSwipedLeft: () => _isOpened(true),
  });
  const getMousePosition = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (
      e.currentTarget.clientHeight - (window.width < 500 ? window.width * 0.2 : 100) <
      e.clientY - e.currentTarget.getBoundingClientRect().top
    ) {
      _cursorY(e.currentTarget.clientHeight - (window.width < 500 ? window.width * 0.2 : 100));
    } else if (
      (window.width < 500 ? window.width * 0.2 : 100) >
      e.clientY - e.currentTarget.getBoundingClientRect().top
    ) {
      _cursorY(window.width < 500 ? window.width * 0.2 : 100);
    } else {
      _cursorY(e.clientY - e.currentTarget.getBoundingClientRect().top);
    }
  };
  const isMobile = useAgent('mobile');
  return (
    <div
      className={`${styles.entire} ${isIntersecting && styles.showed} ${initTransition && styles.init}`}
      ref={tocRef}
      onMouseEnter={(e) => window.width < 1200 && !isMobile && getMousePosition(e)}
      // onMouseMove={(e) => isOpened && getMousePosition(e)}
      onClick={(e) => isOpened && window.width < 1200 && !isMobile && getMousePosition(e)}
    >
      <div className={styles.meta} ref={_height}>
        {window.width < 1200 ? (
          <div className={styles.inner}>
            <Twemoji svg onlyEmojiClassName={styles.emoji} text={meta.emoji} options={{ protocol: 'https' }} />
            <h1 className={styles.title}>{meta.title}</h1>
          </div>
        ) : (
          <>
            <Twemoji svg onlyEmojiClassName={styles.emoji} text={meta.emoji} options={{ protocol: 'https' }} />
            <h1 className={styles.title}>{meta.title}</h1>
          </>
        )}
      </div>
      <div
        className={`${styles.toc} ${isOpened && styles.opened}`}
        style={{
          maxHeight: window.width < 1200 ? undefined : `calc(100vh - ${paddingTop + paddingBottom + height}px)`,
          top: window.width < 1200 ? undefined : isIntersecting ? `${1 * height}px` : '0px',
        }}
        {...swipeOptions}
      >
        <div
          className={styles.title}
          onClick={() => _isOpened((prev) => !prev)}
          style={{ top: window.width < 1200 ? `${cursorY}px` : undefined }}
        >
          {window.width < 1200 && isOpened ? '閉じる' : '目次'}
        </div>
        {headings && (
          <ul
            className={styles.body}
            style={{
              paddingTop:
                window.width < 1200 && isIntersecting
                  ? window.width < 500
                    ? `${height + window.width * 0.05}px`
                    : `${height + 25}px`
                  : undefined,
              height: isMobile
                ? window.width < 500
                  ? window.height - window.width * 0.24 - 11 - 11
                  : window.height - 20 - 60 - 20 - 20 - 11 - 11
                : undefined,
            }}
          >
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

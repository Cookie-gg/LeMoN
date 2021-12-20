import { Link, useRouter } from 'utils/next';
import { memo, MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { Twemoji } from 'react-emoji-render';
import { useAgent, useFirstPeriod, useHeight, useIntersect, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/ArticleToc.module.scss';
import { useSwipeable } from 'react-swipeable';
import { ScrollerContext } from './PageFrame';

interface PropsType {
  meta: {
    title: string;
    emoji: string;
  };
  activeSection: number;
  className?: string;
  headings?: {
    level: 1 | 2;
    text: string;
  }[];
}

function ArticleToc({ meta, activeSection, headings, className }: PropsType) {
  const paddingTop = 30 + 11 + 110; // value from scss/components/PageFrame.module.scss
  const paddingBottom = 30 + 11 + 30; // value from scss/components/PageFrame.module.scss
  const window = useWindowDimensions();
  const isMobile = useAgent('mobile');
  const id = `${useRouter().query.id}`;
  const [cursorY, _cursorY] = useState(0);
  const initTransition = useFirstPeriod(0);
  const tocRef = useRef<HTMLDivElement>(null);
  const scroller = useContext(ScrollerContext);
  const [isOpened, _isOpened] = useState(false);
  const [height, _height] = useHeight<HTMLDivElement>();
  const swipeOptions = useSwipeable({
    onSwipedRight: () => _isOpened(false),
    onSwipedLeft: () => _isOpened(true),
  });
  const isIntersecting = useIntersect({
    root: scroller?.current,
    el: tocRef.current,
    rootMargin: `0px 0px -100%`,
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
  useEffect(() => _isOpened(false), [id]);
  return (
    <div
      className={`${styles.entire} ${isIntersecting && styles.showed} ${initTransition && styles.init} ${className}`}
      ref={tocRef}
      onMouseEnter={(e) => window.width < 1200 && !isMobile && getMousePosition(e)}
      // onMouseMove={(e) => isOpened && window.width < 1200 && !isMobile && getMousePosition(e)}
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
        ref={isMobile ? swipeOptions.ref : undefined}
        onMouseDown={isMobile ? swipeOptions.onMouseDown : undefined}
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
                  ? window.height - window.width * 0.27
                  : window.height - 20 - 75 - 20 - 20
                : undefined,
            }}
          >
            {headings.map((heading, i) => (
              <Link href={`#${encodeURI(heading.text)}`} key={`${heading.text}_${i}`}>
                <li
                  className={`${activeSection === i && styles.active} ${heading.level === 1 ? styles._1 : styles._2}`}
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

export default memo(ArticleToc, (prev, next) => prev.activeSection === next.activeSection);

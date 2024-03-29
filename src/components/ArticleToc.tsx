import { Link, useRouter } from 'utils/libs/next';
import { memo, MouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useAgent, useFirstPeriod, useHeight, useIntersect, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/ArticleToc.module.scss';
import { useSwipeable } from 'react-swipeable';
import { ScrollerContext } from './MainFrame';
import EmojiSvg from './EmojiSvg';
import { encodeEmoji } from 'utils/common';

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
  const paddingTop = 30 + 11 + 110; // value from scss/components/MainFrame.module.scss
  const paddingBottom = 30 + 11 + 30; // value from scss/components/MainFrame.module.scss
  const window = useWindowDimensions() as { width: number; height: number };
  const isMobile = useAgent('mobile');
  const id = `${useRouter().query.id}`;
  const [cursorY, _cursorY] = useState(0);
  const initTransition = useFirstPeriod(0);
  const tocRef = useRef<HTMLDivElement>(null);
  const ios = useAgent('iphone');
  const scroller = useContext(ScrollerContext);
  const [isOpened, _isOpened] = useState(false);
  const [height, _height] = useHeight<HTMLDivElement>();
  const swipeOptions = useSwipeable({
    onSwipedRight: () => _isOpened(false),
    onSwipedLeft: () => _isOpened(true),
  });
  const innerTocRef = useRef<HTMLDivElement | null>(null);
  const observer = useIntersect({
    root: scroller?.current,
    el: tocRef.current,
    rootMargin: `0px 0px -100%`,
  });
  const getMousePosition = useCallback(
    (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
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
    },
    [window.width],
  );
  useEffect(() => {
    innerTocRef.current?.scrollTo(0, 0);
    _isOpened(false);
  }, [id]);
  return (
    <div
      className={`${styles.entire} ${observer.intersect && styles.showed} ${
        initTransition && styles.init
      } ${className}`}
      ref={tocRef}
      onMouseEnter={(e) => window.width < 1200 && !isMobile && getMousePosition(e)}
      // onMouseMove={(e) => isOpened && window.width < 1200 && !isMobile && getMousePosition(e)}
      onClick={(e) => isOpened && window.width < 1200 && !isMobile && getMousePosition(e)}
    >
      <div className={`${styles.meta} ${ios && styles.ios}`} ref={_height}>
        {window.width < 1200 ? (
          <div className={styles.inner}>
            <EmojiSvg unicode={encodeEmoji(meta.emoji)} className={styles.emoji} />
            <h1 className={styles.title}>{meta.title}</h1>
          </div>
        ) : (
          <>
            <EmojiSvg unicode={encodeEmoji(meta.emoji)} className={styles.emoji} />
            <h1 className={styles.title}>{meta.title}</h1>
          </>
        )}
      </div>
      <div
        className={`${styles.toc} ${isOpened && styles.opened}`}
        style={{
          maxHeight: window.width < 1200 ? undefined : `calc(100vh - ${paddingTop + paddingBottom + height}px)`,
          top: window.width < 1200 ? undefined : observer.intersect ? `${1 * height}px` : '0px',
        }}
        ref={(el) => {
          swipeOptions.ref(el);
          innerTocRef.current = el;
        }}
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
                window.width < 1200 && observer.intersect
                  ? window.width < 500
                    ? `${height + window.width * 0.05}px`
                    : `${height + 25}px`
                  : undefined,
              maxHeight: isMobile
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

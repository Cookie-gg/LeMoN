import { useWindowDimensions } from 'hooks';
import { memo, ReactElement, useContext, useEffect, useRef } from 'react';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/ArticleBody.module.scss';
import { ScrollerContext } from './PageFrame';

interface PropsType {
  body: string;
  headingTexts?: string[];
  _activeSection: (n: number) => void;
  children?: ReactElement;
}

function ArticleBody({ body, _activeSection, headingTexts, children }: PropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useContext(ScrollerContext);
  const window = useWindowDimensions() as { width: number; height: number };
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => {
    const el = ref.current;
    if (headingTexts && el && window.height && window.width) {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach(
            (entry) =>
              entry.isIntersecting &&
              headingTexts.forEach((text, i) => text === entry.target.textContent && _activeSection(i)),
          ),
        {
          root: scroller?.current,
          rootMargin: `0px 0px -95%`,
          threshold: 0,
        },
      );
      Array.from(el.querySelectorAll('h1, h2')).map((heading) => observer.observe(heading));
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [query, window, headingTexts, _activeSection, scroller]);

  return window.width < 1200 ? (
    <div className={styles.wrapper}>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
      {children}
    </div>
  ) : (
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
  );
}

export default memo(ArticleBody, (prev, next) => prev.body === next.body);

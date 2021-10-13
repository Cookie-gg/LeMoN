import { useWindowDimensions } from 'hooks';
import { ScrollerContext } from './PageFrame';
import { useRouter } from 'utils/next';
import md from '../assets/scss/components/Markdown.module.scss';
import styles from '../assets/scss/components/ArticleBody.module.scss';
import { memo, ReactElement, useContext, useEffect, useRef } from 'react';

interface PropsType {
  body: string;
  headingTexts?: string[];
  _activeSection: (n: number) => void;
  children?: ReactElement;
}

function ArticleBody({ body, _activeSection, headingTexts, children }: PropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useContext(ScrollerContext);
  const query = (useRouter().query as { id: string[] }).id[0];
  const window = useWindowDimensions() as { width: number; height: number };
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
      <div className={`${styles.entire} ${md.styles}`} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
      {children}
    </div>
  ) : (
    <div className={`${styles.entire} ${md.styles}`} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
  );
}

export default memo(ArticleBody, (prev, next) => prev.body === next.body && prev.children === next.children);

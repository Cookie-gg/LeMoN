import { useWindowDimensions } from 'hooks';
import { memo, ReactElement, useEffect, useRef } from 'react';
import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/ArticleBody.module.scss';

interface PropsType {
  body: string;
  headingTexts?: string[];
  _activeSection: (n: number) => void;
  children?: ReactElement;
}

function ArticleBody({ body, _activeSection, headingTexts, children }: PropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const window = useWindowDimensions() as { width: number; height: number };
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => {
    const el = ref.current;
    if (headingTexts && el && window.height && window.width) {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach(
            (el) =>
              el.isIntersecting &&
              headingTexts.forEach((text, i) => text === el.target.textContent && _activeSection(i)),
          ),
        {
          root: null, // document
          rootMargin: `0px -71px -${
            window.height -
            (window.width < 820 ? (window.width < 500 ? 11 + window.width * 0.165 : 11 + 20 + 60 - 65) : 152)
          }px`,
          threshold: 0,
        },
      );
      Array.from(el.querySelectorAll('h1, h2')).map((heading) => observer.observe(heading));
      return () => {
        observer.unobserve(el);
        observer.disconnect();
      };
    }
  }, [query, window, headingTexts, _activeSection]);

  return window.width < 1200 ? (
    <div className={styles.wrapper}>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
      {children}
    </div>
  ) : (
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />
  );
}

export default memo(ArticleBody);

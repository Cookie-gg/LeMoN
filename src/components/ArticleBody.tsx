import parse from 'html-react-parser';
import { useRouter } from 'utils/next';
import { useWindowDimensions } from 'hooks';
import { ScrollerContext } from './PageFrame';
import markdown from '../assets/scss/components/Markdown.module.scss';
import styles from '../assets/scss/components/ArticleBody.module.scss';
import { Fragment as _, memo, ReactElement, useContext, useEffect, useRef } from 'react';

interface PropsType {
  html: string;
  headingTexts?: string[];
  _activeSection: (n: number) => void;
  children: ReactElement;
}

function ArticleBody({ html, _activeSection, headingTexts, children }: PropsType) {
  const id = `${useRouter().query.id}`;
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useContext(ScrollerContext);
  const window = useWindowDimensions();
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
  }, [id, window, headingTexts, _activeSection, scroller]);

  return window.width < 1200 ? (
    <div className={styles.wrapper}>
      <div className={`${styles.inner} ${markdown.styles}`} ref={ref}>
        {html.split(/\<.*?table.*?\>/).map((text, i) => (
          <_ key={i}>{i % 2 === 0 ? parse(text) : parse(`<table>${text}</table>`, { trim: true })}</_>
        ))}
      </div>
      {children}
    </div>
  ) : (
    <div className={`${styles.inner} ${markdown.styles}`} ref={ref}>
      {html.split(/\<.*?table.*?\>/).map((text, i) => (
        <_ key={i}>{i % 2 === 0 ? parse(text) : parse(`<table>${text}</table>`, { trim: true })}</_>
      ))}
    </div>
  );
}

export default memo(ArticleBody, (prev, next) => prev.html === next.html && prev.children === next.children);

import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/ArticleBody.module.scss';
import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

interface PropsType {
  body: string;
  _table: Dispatch<SetStateAction<{ tagName: string; text: string; height: number }[]>>;
}

export default function ArticleBody({ body, _table }: PropsType) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current as HTMLDivElement;
    const getToc = () => {
      _table(
        Array.from(el.querySelectorAll('h1, h2')).map((el) => {
          return {
            tagName: el.tagName,
            text: el.textContent as string,
            height: el.getBoundingClientRect().top,
          };
        }),
      );
    };
    getToc();
    const resizeObserver = new ResizeObserver(() => getToc());
    resizeObserver.observe(el);
    el.addEventListener('transitionstart', () => resizeObserver.disconnect());
    el.addEventListener('transitionrun', () => getToc());
    // window.addEventListener('resize', () => getToc());
    return () => {
      el.removeEventListener('transitionstart', () => resizeObserver.disconnect());
      el.removeEventListener('transitionrun', () => getToc());
      // window.removeEventListener('resize', () => getToc());
    };
  }, [router.asPath, _table]);

  return <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />;
}

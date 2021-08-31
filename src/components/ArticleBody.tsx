import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/Markdown.module.scss';
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
    const resizeObserver = new ResizeObserver((callback) => {
      _table(
        Array.from(callback[0].target.querySelectorAll('h1, h2')).map((el) => {
          return {
            tagName: el.tagName,
            text: el.textContent as string,
            height: el.getBoundingClientRect().top,
          };
        }),
      );
    });
    resizeObserver.observe(el);
    el.addEventListener('transitionstart', () => resizeObserver.disconnect());
  }, [router.asPath, _table]);

  return <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} ref={ref} />;
}

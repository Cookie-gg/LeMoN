import { Context } from 'components/PageFrame';
import { useMount, useFirstPeriod, useHeight, useTop } from 'hooks';
import styles from '../assets/scss/components/ArticleToc.module.scss';
import { Children, cloneElement, ReactElement, useContext } from 'react';

interface PropsType {
  children: ReactElement;
  table: { tagName: string; text: string; height: number }[];
}

export default function ArticleToc({ children, table }: PropsType) {
  const paddingTop = 151;
  const paddingBottom = 71;
  const isMounted = useMount();
  const noTransition = useFirstPeriod(1);
  const [scroller, scrollTop] = useContext(Context);
  const [height, _height] = useHeight<HTMLDivElement>();
  const [top, _top] = useTop<HTMLDivElement>(paddingTop);
  const child = Children.map(children, (child) => cloneElement(child, { scrollTop, top, paddingTop, _height }));
  return (
    <div
      ref={_top}
      className={`${styles.entire} ${scrollTop > top - paddingTop && styles.show} ${isMounted && styles.mounted} ${
        noTransition && styles.no_transition
      }`}
      style={{
        top: `${scrollTop > top - paddingTop ? scrollTop - top + paddingTop : 0}px`,
        maxHeight: `calc(100vh - ${paddingTop + paddingBottom}px)`,
      }}
    >
      {child}
      <div
        className={styles.toc}
        style={{
          maxHeight: `calc(100vh - ${paddingTop + paddingBottom + height}px)`,
          marginTop: `${scrollTop > top - paddingTop ? 0 : -1 * height}px`,
        }}
      >
        <div className={styles.title}>目次</div>
        <ul className={styles.body}>
          {table.map((el: { tagName: string; text: string; height: number }, i: number) => (
            <li
              key={i}
              className={`${
                scrollTop < (i === table.length - 1 ? 30000 : table[i + 1].height - 250) &&
                scrollTop > (i === 0 ? -30000 : el.height - 250) &&
                styles.active
              } ${el.tagName === 'H1' ? styles.heading_1 : styles.heading_2}`}
              onClick={() => (scroller.current as HTMLDivElement).scrollTo(0, el.height - 165)}
            >
              {el.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

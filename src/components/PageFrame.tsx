import { ReactElement, useState } from 'react';
import styles from '../assets/scss/components/Frame.module.scss';

export default function PageFrame({
  children,
  pageStyles,
}: {
  children: ReactElement;
  pageStyles: string | string[];
}) {
  const [marginTop, _marginTop] = useState<number>(0);
  const [section, _section] = useState<number>(1);
  const n_section = children.props.children.length;
  const scrollEvent = (e: EventTypes) => {
    const el = e.target as HTMLDivElement;
    const diff = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * n_section);
    _section(diff !== n_section ? diff + 1 : n_section);
    _marginTop(el.scrollTop);
  };
  return n_section > 1 ? (
    <>
      <div className={`${styles.wrapper} ${styles.scroller}`} onScroll={(e) => scrollEvent(e)}>
        <div className={styles.contents} style={{ marginTop: `${marginTop}px` }}>
          {children.props.children.map((child: ReactElement, i: number) => (
            <section
              key={i}
              className={pageStyles[i]}
              style={{ transform: `translateY(${100 * (i + 1 - section)}%)` }}
            >
              {child}
            </section>
          ))}
        </div>
        <div style={{ height: `${n_section * 60}%` }}></div>
      </div>
      <div className={styles.buttons}>
        {children.props.children.map((child: ReactElement, i: number) => (
          <button
            key={i}
            className={`${i + 1 === section && styles.current}`}
            style={{ height: `calc(40vh / ${n_section})` }}
            onClick={(e) => {
              const el = (e.target as HTMLDivElement).parentElement!.previousElementSibling!;
              if (i === 0) {
                el.scrollTop = 0;
              } else if (i + 1 === n_section) {
                el.scrollTop = el.scrollHeight - el.clientHeight;
              } else {
                el.scrollTop = ((el.scrollHeight - el.clientHeight) / 3) * i + 1;
              }
            }}
          ></button>
        ))}
      </div>
    </>
  ) : (
    <div className={styles.wrapper}>
      <section className={pageStyles as string}>{children}</section>
    </div>
  );
}

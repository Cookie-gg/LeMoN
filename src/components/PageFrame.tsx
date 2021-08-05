import { useMount } from 'hooks';
import { useReducer } from 'react';
import { ReactElement, useState } from 'react';
import styles from '../assets/scss/components/PageFrame.module.scss';

export default function PageFrame({
  children,
  secStyles,
  active,
}: {
  children: ReactElement;
  secStyles: string | string[];
  active?: string;
}) {
  const [marginTop, _marginTop] = useState<number>(0);
  const [section, _section] = useState<number>(1);
  const isMounted = useMount();
  const n_section: number = children.props.children.length;
  const scrollEvent = (e: ScrollTypes) => {
    const el = e.target as HTMLDivElement;
    const diff = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * n_section);
    const activeNumber = diff !== n_section ? diff + 1 : n_section;
    _section(activeNumber);
    _isActive(activeNumber);
    _marginTop(el.scrollTop * 2);
  };

  const initialState: { [key: string]: boolean } = { section_1: true };
  if (n_section > 1) {
    for (let i = 1; i < n_section; i++) {
      initialState[`section_${i + 1}`] = false;
    }
  }
  const reducer = (state: typeof initialState, n: number) => {
    if (state[`section_${n}`] === true) return state;
    return { ...state, ...{ [`section_${n}`]: true } };
  };
  const [isActive, _isActive] = useReducer(reducer, initialState);

  return n_section > 1 ? (
    <>
      <div className={`${styles.wrapper} ${styles.scroller}`} onScroll={(e) => scrollEvent(e)}>
        <div className={styles.contents} style={{ marginTop: `${marginTop}px` }}>
          {children.props.children.map((child: ReactElement, i: number) => (
            <section
              key={i}
              className={`${secStyles[i]} ${isActive[`section_${i + 1}`] && active} ${
                isMounted && 'mounted'
              }`}
              style={{ transform: `translateY(${100 * (i + 1 - section)}%)` }}
            >
              {child}
            </section>
          ))}
        </div>
        <div style={{ height: `${n_section * (50 + (n_section - 1) * 15)}%` }}></div>
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
      <section className={secStyles as string}>{children}</section>
    </div>
  );
}

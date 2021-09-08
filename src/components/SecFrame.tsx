import { useState, useReducer, ReactElement } from 'react';
import styles from '../assets/scss/components/SecFrame.module.scss';

interface ProspType {
  children: ReactElement;
  sectionClass: string[];
  activeClass: string;
}

export default function SecFrame({ children, sectionClass, activeClass }: ProspType) {
  const [scrollTop, _scrollTop] = useState(0);
  const [section, _section] = useState<number>(1);
  const n: number = children.props.children.length;

  const initialState: { [key: string]: boolean } = { section_1: true };
  for (let i = 1; i < n; i++) {
    initialState[`section_${i + 1}`] = false;
  }
  const reducer = (state: typeof initialState, n: number) => {
    if (state[`section_${n}`] === true) return state;
    return { ...state, ...{ [`section_${n}`]: true } };
  };
  const [isActive, _isActive] = useReducer(reducer, initialState);

  const scrollEvent = (e: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const el = e.target as HTMLDivElement;
    const diff = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * n);
    const activeNumber = diff !== n ? diff + 1 : n;
    _section(activeNumber);
    _isActive(activeNumber);
    _scrollTop(el.scrollTop * 2);
  };

  return (
    <>
      <div className={styles.wrapper} onScroll={(e) => scrollEvent(e)}>
        <div className={styles.contents} style={{ marginTop: `${scrollTop}px` }}>
          {children.props.children.map((child: ReactElement, i: number) => (
            <section
              key={i}
              className={`${sectionClass[i]} ${isActive[`section_${i + 1}`] && activeClass}`}
              style={{ transform: `translateY(${100 * (i + 1 - section)}%)` }}
            >
              {child}
            </section>
          ))}
        </div>
        <div style={{ height: `${n * (50 + (n - 1) * 15)}%` }}></div>
      </div>
      <div className={styles.buttons}>
        {children.props.children.map((child: ReactElement, i: number) => (
          <button
            key={i}
            className={`${i + 1 === section && styles.current}`}
            style={{ height: `calc(40vh / ${n})` }}
            onClick={(e) => {
              const el = (e.target as HTMLDivElement).parentElement!.previousElementSibling!;
              if (i === 0) {
                el.scrollTop = 0;
              } else if (i + 1 === n) {
                el.scrollTop = el.scrollHeight - el.clientHeight;
              } else {
                el.scrollTop = ((el.scrollHeight - el.clientHeight) / 3) * i + 1;
              }
            }}
          ></button>
        ))}
      </div>
    </>
  );
}

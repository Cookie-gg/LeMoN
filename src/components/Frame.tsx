import { useFirst } from 'hooks';
import { useRouter } from 'utils/next';
import { PageTransition } from 'components';
import styles from '../assets/scss/components/Frame.module.scss';
import { ReactElement, cloneElement, Children, useState } from 'react';

export default function Frame({
  children,
  isMounted,
  type,
  section = 1,
  _section,
}: {
  children: ReactElement;
  isMounted?: boolean;
  type: string;
  section?: number;
  _section?: (n: number) => void;
}) {
  const isFirst = useFirst();
  const router = useRouter();
  const [marginTop, _marginTop] = useState<number>(0);
  if (type === 'base') {
    const child = Children.map(children, (child) =>
      router.pathname === '/' ? cloneElement(child, { isFirst }) : child,
    );
    return (
      <>
        <main className={`${styles.main} ${isMounted && styles.mounted}`}>
          <PageTransition isFirst={isFirst} />
          {child}
        </main>
      </>
    );
  } else {
    const n_section = children.props.children.length;
    const scrollEvent = (e: EventTypes) => {
      if (_section) {
        const el = e.target as HTMLDivElement;
        const diff = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * n_section);
        _section(diff !== n_section ? diff + 1 : n_section);
        _marginTop(el.scrollTop);
      }
    };
    return n_section > 1 ? (
      <>
        <div className={`${styles.wrapper} ${styles.scroller}`} onScroll={(e) => scrollEvent(e)}>
          <div className={styles.contents} style={{ marginTop: `${marginTop}px` }}>
            {(() => {
              const list = [];
              for (let i = 1; i <= 2; i++)
                list.push(
                  <section key={i} style={{ transform: `translateY(${100 * (i - section)}%)` }}>
                    {children.props.children[i - 1]}
                  </section>,
                );
              return list;
            })()}
          </div>
          <div className={styles.contents_height} style={{ height: `${n_section * 60}%` }}></div>
        </div>
        <div className={styles.buttons}>
          {(() => {
            const item = [];
            for (let i = 1; i < n_section + 1; i++)
              item.push(
                <button
                  key={i}
                  className={`${i === section && styles.current}`}
                  style={{ height: `calc(40vh / ${n_section})` }}
                  onClick={(e) => {
                    const el = (e.target as HTMLDivElement).parentElement!.previousElementSibling!;
                    if (i === 1) {
                      el.scrollTop = 0;
                    } else if (i === n_section) {
                      el.scrollTop = el.scrollHeight - el.clientHeight;
                    } else {
                      el.scrollTop = ((el.scrollHeight - el.clientHeight) / 3) * (i - 1) + 1;
                    }
                  }}
                ></button>,
              );
            return item;
          })()}
        </div>
      </>
    ) : (
      <div className={styles.wrapper}>{children}</div>
    );
  }
}

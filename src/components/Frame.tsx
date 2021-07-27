import { useFirst } from 'hooks';
import { useRouter } from 'utils/next';
import { PageTransition } from 'components';
import styles from '../assets/scss/components/Frame.module.scss';
import { ReactElement, cloneElement, Children } from 'react';
import { UIEvent } from 'react';
import { useState } from 'react';

export default function Frame({
  children,
  isMounted,
  type,
  number = 0,
  section,
  _section,
}: {
  children: ReactElement;
  isMounted?: boolean;
  type: string;
  number?: number;
  section?: number;
  _section?: (n: number) => void;
}) {
  const isFirst = useFirst();
  const router = useRouter();
  const [marginTop, _marginTop] = useState<number>(0);
  if (type === 'base') {
    const child = Children.map(children, () => {
      if (router.pathname === '/') {
        return cloneElement(children, { isFirst });
      } else {
        return children;
      }
    });
    return (
      <>
        <main className={`${styles.main} ${isMounted && styles.mounted}`}>
          <PageTransition isFirst={isFirst} />
          {child}
        </main>
      </>
    );
  } else {
    const scrollEvent = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
      if (_section) {
        const el = e.target as HTMLDivElement;
        const diff = Math.floor((el.scrollTop / (el.scrollHeight - el.clientHeight)) * number);
        _section(diff !== number ? diff + 1 : number);
        _marginTop(el.scrollTop);
      }
    };
    return number > 1 ? (
      <>
        <div className={styles.scroller} onScroll={(e) => scrollEvent(e)}>
          <div className={styles.contents} style={{ marginTop: `${marginTop}px` }}>
            {children}
          </div>
          <div className={styles.scroller_height} style={{ height: `${number * 60}%` }}></div>
        </div>
        <div className={styles.wrapper}>
          {(() => {
            const item = [];
            for (let i = 1; i < number + 1; i++)
              item.push(
                <button
                  key={i}
                  className={`${i === section && styles.current}`}
                  style={{ height: `calc(50vh / ${number})` }}
                  onClick={(e) => {
                    const el = (e.target as HTMLDivElement).parentElement!.previousElementSibling!;
                    if (i === 1) {
                      el.scrollTop = 0;
                    } else if (i === number) {
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
      <div className={styles.scroller}>{children}</div>
    );
  }
}

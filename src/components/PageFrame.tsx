import { memo } from 'react';
import { useHeight } from 'hooks';
import { ReactElement } from 'react';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useContext } from 'react';
import { Context } from 'pages/_app';

interface ProspType {
  children: ReactElement;
  sectionClass: string;
}

function PageFrame({ children, sectionClass }: ProspType) {
  const [height, ref] = useHeight<HTMLDivElement>();
  const [scroller, scrollTop, _scrollTop] = useContext(Context);
  function scrollEvent(e: React.UIEvent<HTMLDivElement, globalThis.UIEvent>) {
    _scrollTop((e.target as HTMLDivElement).scrollTop);
  }
  return (
    <div className={styles.wrapper} id="scrollElement" onScroll={(e) => scrollEvent(e)} ref={scroller}>
      <div className={styles.contents} style={{ marginTop: `${scrollTop}px` }}>
        <section className={sectionClass} style={{ top: `${scrollTop * -1}px` }} ref={ref}>
          {children}
        </section>
      </div>
      <div style={{ height: `${height}px` }} />
    </div>
  );
}

export default memo(PageFrame, (prev: ProspType, next: ProspType) => prev === next);

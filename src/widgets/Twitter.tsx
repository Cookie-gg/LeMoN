import { useEffect, useRef } from 'react';
import { domToReact, Element } from 'html-react-parser';
import { memo } from 'react';

function Twitter({ el }: { el: Element }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const w = window as Window &
        typeof globalThis & { twttr: { widgets: { load: (t: HTMLElement | null) => void } } };
      w.twttr && w.twttr.widgets.load(containerRef.current);
    } catch (e) {
      e instanceof Error && console.log(e.message);
    }
  }, []);
  return (
    <div className="link_widget twitter" ref={containerRef}>
      <div>{domToReact(el.children)}</div>
    </div>
  );
}

export default memo(Twitter);

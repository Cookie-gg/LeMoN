import { useEffect, memo } from 'react';
import { Element } from 'html-react-parser';

function CodePen({ el }: { el: Element }) {
  const slug = el.attribs.href.split('/').splice(-1).join().split('?')[0];
  const query: { [key: string]: string } = Object.assign(
    {},
    ...el.attribs.href
      .split('?')
      .splice(1)
      .join()
      .split('&')
      .map((q) => ({ [q.split('=')[0]]: q.split('=')[1] })),
  );
  useEffect(() => {
    const w = window as Window & typeof globalThis & { __CPEmbed: (arg: string) => void };
    w.__CPEmbed && w.__CPEmbed('.codepen');
  }, []);
  return (
    <div className="link_widget codepen">
      <div className="codepen" data-default-tab={query['default-tab'] || 'html, result'} data-slug-hash={slug}></div>
    </div>
  );
}
export default memo(CodePen);

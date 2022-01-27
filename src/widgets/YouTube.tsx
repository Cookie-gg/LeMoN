import { useEffect } from 'react';
import { Element } from 'html-react-parser';
import { useMemo } from 'react';
import { memo } from 'react';

function YouTube({ el }: { el: Element }) {
  const query: { [key: string]: string } = Object.assign(
    {},
    ...el.attribs.href
      .split('?')
      .splice(1)
      .join()
      .split('&')
      .map((q) => ({ [q.split('=')[0]]: q.split('=')[1] })),
  );
  const playerVars = useMemo(
    () => [
      'autohide',
      'autoplay',
      'cc_load_policy',
      'cc_lang_pref',
      'color',
      'controls',
      'disablekb',
      'enablejsapi',
      'end',
      'fs',
      'hl',
      'iv_load_policy',
      'list',
      'listType',
      'loop',
      'modestbranding',
      'mute',
      'origin',
      'playlist',
      'playsinline',
      'rel',
      'showinfo',
      'start',
    ],
    [],
  );
  useEffect(() => {
    new YT.Player(query.v, {
      videoId: query.v,
      width: '100%',
      height: undefined,
      // playerVars: Object.assign({}, ...playerVars.map((key) => ({ [key]: query[key] || undefined }))),
    });
  }, [query, playerVars]);
  console.log(Object.assign({}, ...playerVars.map((key) => ({ [key]: query[key] || undefined }))));
  return (
    <div className="link_widget youtube">
      <div id={query.v} />
    </div>
  );
}
export default memo(YouTube);

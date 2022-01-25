import sdk from '@stackblitz/sdk';
import { memo, useEffect, useRef } from 'react';
import { Element } from 'html-react-parser';

function StackBlitz({ el }: { el: Element }) {
  const splited = el.attribs.href.split('/');
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    splited[3] === 'github'
      ? containerRef.current && sdk.embedGithubProject(containerRef.current, `${splited.splice(4).join('/')}`)
      : containerRef.current && sdk.embedProjectId(containerRef.current, splited[4]);
  }, [splited]);
  return (
    <div className="link_widget stackblitz">
      <div ref={containerRef} />
    </div>
  );
}

export default memo(StackBlitz);

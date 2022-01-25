import { memo } from 'react';
import Gist from 'react-gist';
import { Element } from 'html-react-parser';

function GithubGist({ el }: { el: Element }) {
  const splited = el.attribs.href.split('/');
  const id = splited[4].split('?')[0];
  const file = splited[4].split('?')[1].replace('file=', '');
  return (
    <div className="link_widget githubgist">
      <Gist id={id} file={file} />
    </div>
  );
}
export default memo(GithubGist);

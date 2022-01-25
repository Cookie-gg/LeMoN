import { memo } from 'react';
import { Element } from 'html-react-parser';

function JSfiddle({ el }: { el: Element }) {
  const splited = el.attribs.href.split('/');
  splited[5] !== 'embedded' && splited.splice(5, 0, 'embedded');
  return (
    <div className="link_widget jsfiddle">
      <iframe src={splited.join('/')}></iframe>
    </div>
  );
}
export default memo(JSfiddle);

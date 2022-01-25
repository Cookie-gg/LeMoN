import { memo } from 'react';
import { Element } from 'html-react-parser';

function CodeSandbox({ el }: { el: Element }) {
  const splited = el.attribs.href.split('/');
  splited[3] !== 'embed' && splited.splice(3, 1, 'embed');
  return (
    <div className="link_widget codesandbox">
      {/* <iframe width="100%" src={splited.join('/')}></iframe> */}
      <iframe
        src={splited.join('/')}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
}
export default memo(CodeSandbox);

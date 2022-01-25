import { memo } from 'react';
import { Element } from 'html-react-parser';

function SpeakerDeck({ el }: { el: Element }) {
  return (
    <div className="link_widget speakerdeck">
      <iframe src={el.attribs.href} title={el.attribs.title} allowFullScreen></iframe>
    </div>
  );
}
export default memo(SpeakerDeck);

import pages from '../assets/scss/pages/About.module.scss';
import { Frame } from 'components';
import { useState } from 'react';
import { Image } from 'utils/next';
import profile from '../assets/img/lemon_gray.png';

export default function About() {
  const [section, _section] = useState<number>(1);
  return (
    <Frame type="scroll" section={section} _section={(n: number) => _section(n)}>
      <>
        {
          <>
            <p>dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
          </>
        }
        {
          <>
            <p>dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
          </>
        }
      </>
    </Frame>
  );
}

import pages from '../assets/scss/pages/About.module.scss';
import { Frame } from 'components';
import { useState } from 'react';
export default function About() {
  const [section, _section] = useState<number>(1);
  console.log(section);
  return (
    <Frame type="scroll" number={2} section={section} _section={(n: number) => _section(n)}>
      <>
        <h1>About Page</h1>
      </>
    </Frame>
  );
}

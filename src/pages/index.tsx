import { memo } from 'react';
import { HeadMeta, LeMoN, PhraseTypo } from 'components';

function Home() {
  return (
    <>
      <HeadMeta title="Home" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Home`} />
      <LeMoN />
      {/* <PhraseTypo /> */}
    </>
  );
}
export default memo(Home);

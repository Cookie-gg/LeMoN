import { memo } from 'react';
import { HeadMeta, LeMoN, PhraseTypo } from 'components';
import home from 'assets/json/home.json';

function Page() {
  return (
    <>
      <HeadMeta title={home.title} ogImage={`${process.env.OG_IMAGE}/page/${home.title}`} />
      <LeMoN />
      <PhraseTypo />
    </>
  );
}
export default memo(Page);

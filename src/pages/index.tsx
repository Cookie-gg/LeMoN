import { memo } from 'react';
import { HeadMeta, LeMoN, PhraseTypo } from 'components';

function Page() {
  return (
    <>
      <HeadMeta title="Home" />
      <LeMoN />
      <PhraseTypo />
    </>
  );
}
export default memo(Page);

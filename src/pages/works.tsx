import { memo } from 'react';
import { HeadMeta } from 'components';

function Works() {

  return (
    <>
      <HeadMeta title="Works" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Works`} />
      <p>Coming soon...</p>
    </>
  );
}

export default memo(Works);

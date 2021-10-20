import { memo } from 'react';
import { HeadMeta, PageFrame } from 'components';
import pages from '../assets/scss/pages/Works.module.scss';

function Page() {
  return (
    <>
      <HeadMeta title="Works" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Works`} />
      <PageFrame classNmae={pages.entire}>
        <p>comming soon...</p>
      </PageFrame>
    </>
  );
}

export default memo(Page);

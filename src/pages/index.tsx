import { memo } from 'react';
import { HeadMeta } from 'components';
import pages from '../assets/scss/pages/Home.module.scss';
import { useFirstMount } from 'hooks';

function Home() {
  const isMounted = useFirstMount();
  return (
    <>
      <HeadMeta title="Home" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Home`} />
      <h1 className={`${pages.title} ${isMounted && pages.mounted} exclude`}>
        <span className={pages.text_wrapper}>
          <span className={pages.text}>LeMoN</span>
        </span>
      </h1>
    </>
  );
}
export default memo(Home);

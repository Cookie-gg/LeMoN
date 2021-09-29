import { memo } from 'react';
import { HeadMeta } from 'components';
import { specifor } from 'utils/common';
import pages from '../assets/scss/pages/Home.module.scss';
import { useMount } from 'hooks';

function Home() {
  const isMounted = useMount();
  return (
    <>
      <HeadMeta title="Home" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Home`} />
      <h1 className={`${pages.title} ${isMounted && pages.mounted} exclude`}>
        <span className={pages.text_wrapper}>
          <span className={pages.text}>LeMoN</span>
        </span>
      </h1>
      <div className={`${pages.phrase} exclude`}>
        {specifor(10, (i: number) => (
          <div key={i}>
            <span className="pc">WEB DEVELOP</span>
            <span className="sp">WEB DEV</span>
          </div>
        ))}
      </div>
    </>
  );
}
export default memo(Home);

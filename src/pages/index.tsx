import { HeadMeta } from 'components';
import { useFirstMount } from 'hooks';
import { specifor } from 'utils/common';
import pages from '../assets/scss/pages/Home.module.scss';

export default function Home() {
  const isMounted = useFirstMount();
  return (
    <>
      <HeadMeta title="Home" />
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

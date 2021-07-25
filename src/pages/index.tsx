import pages from '../assets/scss/pages/Home.module.scss';
import { Head } from 'utils/next';
import { useMount } from 'hooks';

export default function Home() {
  const isMounted = useMount();
  return (
    <>
      <Head>
        <title>LeMoN | Home</title>
      </Head>
      <h1 className={`${pages.title} ${isMounted && pages.mounted}`}>
        <span className={pages.text_wrapper}>
          <span className={pages.text}>LeMoN</span>
        </span>
      </h1>
      <div className={pages.phrase}>
        {(() => {
          const item = [];
          for (let i = 0; i < 10; i++)
            item.push(
              <div key={i}>
                <span className="pc">WEB DEVELOP</span>
                <span className="sp">WEB DEV</span>
              </div>,
            );
          return item;
        })()}
      </div>
    </>
  );
}

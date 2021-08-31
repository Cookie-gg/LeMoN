import { useMount } from 'hooks';
import { Head } from 'utils/next';
import { PageFrame, Heading } from 'components';
import pages from '../assets/scss/pages/Works.module.scss';

export default function Works() {
  const isMounted = useMount();
  return (
    <>
      <Head>
        <title>LeMoN | Works</title>
      </Head>
      <PageFrame sectionClass={`${pages.portfolio} ${isMounted && pages.mounted}`}>
        <>
          {
            <>
              <Heading rank={1} text="My Portfolio" className={pages.heading} />
            </>
          }
        </>
      </PageFrame>
    </>
  );
}

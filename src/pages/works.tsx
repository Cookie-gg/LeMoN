import { Head } from 'utils/next';
import { PageFrame, Heading } from 'components';
import pages from '../assets/scss/pages/Works.module.scss';
import Portfolio from 'assets/img/portfolio_thumbnail.png';

export default function Works() {
  return (
    <>
      <Head>
        <title>LeMoN | Works</title>
      </Head>
      <PageFrame secStyles={pages.portfolio}>
        <>
          {
            <>
              <Heading rank={1} text="My Portfolio" className={pages.heading} />
              <div className={pages.image} style={{ backgroundImage: `url(${Portfolio.src})` }} />
            </>
          }
        </>
      </PageFrame>
    </>
  );
}

import pages from '../assets/scss/pages/Home.module.scss';
import { Head } from 'utils/next';
import { useCheck } from 'hooks';

export default function Home() {
  const isMounted = useCheck();
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
    </>
  );
}

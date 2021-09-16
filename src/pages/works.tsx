import { useMount } from 'hooks';
import { Head } from 'utils/next';
import { PageFrame, Heading } from 'components';
import pages from '../assets/scss/pages/Works.module.scss';
import useForm from 'hooks/useForm';

export default function Works() {
  const isMounted = useMount();
  const initialState = {
    url: '',
  };
  const [formData, _formData] = useForm(initialState);
  return (
    <>
      <Head>
        <title>LeMoN | Works</title>
      </Head>
      <p>Coming soon...</p>
      {/* <PageFrame classNmae={`${pages.portfolio} ${isMounted && pages.mounted}`}>
        <>
          {
            <>
              <Heading rank={1} text="My Portfolio" className={pages.heading} />
              <input type="file" name="url" onChange={(e) => _formData(e)} />
              <img src={formData.url} alt="" />
            </>
          }
        </>
      </PageFrame> */}
    </>
  );
}

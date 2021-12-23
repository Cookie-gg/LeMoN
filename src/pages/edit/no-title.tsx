import axios from 'axios';
import { memo } from 'react';
import { Editor, PageFrame } from 'components';
import { GetServerSideProps, Head } from 'utils/next';
import styles from '../../assets/scss/pages/Edit.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await axios.get(`${process.env.MELON}/status`, {
      headers: {
        key: `${process.env.AUTH_KEY}`,
        authorization: `bearer ${ctx.req.headers.cookie?.replace('token=', '')}`,
      },
    });
    return { props: {} };
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
};

function Page() {
  return (
    <PageFrame classNmae={styles.post}>
      <>
        <Head>
          <title>Edit | LeMoN</title>
        </Head>
        <Editor />
      </>
    </PageFrame>
  );
}

export default memo(Page);

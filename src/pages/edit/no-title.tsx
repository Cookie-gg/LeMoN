import { memo } from 'react';
import nookies from 'nookies';
import { Editor, PageFrame } from 'components';
import { auth, cookie } from 'utils/common';
import { GetServerSideProps, Head } from 'utils/next';
import styles from '../../assets/scss/pages/Edit.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await auth('get', '/status', cookie(ctx.req.headers.cookie).token);
    return { props: {} };
  } catch {
    nookies.destroy(null, 'token');
    return { redirect: { destination: '/login', permanent: false } };
  }
};

function Page() {
  return (
    <PageFrame className={styles.post}>
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

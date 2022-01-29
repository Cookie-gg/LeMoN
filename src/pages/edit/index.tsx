import { memo } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'utils/libs/next';
import editQuery, { EditQueryType } from 'data/editQuery';
import styles from '../../assets/scss/pages/Edit.module.scss';
import { Heading, PageFrame, ArticleList, HeadMeta } from 'components';
import { auth, cookie } from 'utils/common';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await auth('get', '/status', cookie(ctx.req.headers.cookie).token);
    return { props: { data: JSON.stringify(await editQuery()) } };
  } catch {
    nookies.destroy(null, 'token');
    return { redirect: { destination: '/login', permanent: false } };
  }
};

function Page({ data }: { data: EditQueryType }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="Edit" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/edit`} />
      <PageFrame className={styles.page}>
        <>
          <Heading className={styles.heading} rank={1} text="PRIVATE" />
          <ArticleList className={styles.articles} data={data.articles} vertical editable type="private" />
          <Heading className={styles.heading} rank={1} text="PUBLIC" />
          <ArticleList className={styles.articles} data={data.articles} vertical editable type="public" />
        </>
      </PageFrame>
    </>
  );
}

export default memo(Page);

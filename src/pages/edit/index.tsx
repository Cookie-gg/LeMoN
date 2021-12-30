import axios from 'axios';
import { memo } from 'react';
import nookies from 'nookies';
import { GetServerSideProps } from 'utils/next';
import editQuery, { EditQueryType } from 'data/editQuery';
import styles from '../../assets/scss/pages/Edit.module.scss';
import { Heading, PageFrame, ArticleList, HeadMeta } from 'components';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_MELON}/status`, {
      headers: {
        key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
        authorization: `bearer ${ctx.req.headers.cookie?.replace('token=', '')}`,
      },
    });
    return { props: { data: JSON.stringify(await editQuery()) } };
  } catch {
    nookies.destroy(ctx, 'token');
    return { redirect: { destination: '/login', permanent: false } };
  }
};

function Page({ data }: { data: EditQueryType }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="Edit" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/edit`} />
      <PageFrame classNmae={styles.page}>
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

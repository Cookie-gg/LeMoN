import axios from 'axios';
import { memo } from 'react';
import { client } from 'graphql/config.gql';
import { Zenn, ZennAdds } from 'types/common';
import { Editor, PageFrame } from 'components';
import { GetServerSideProps, Head } from 'utils/next';
import styles from '../../assets/scss/pages/Edit.module.scss';
import { FindArticleDocument, FindArticleQuery } from 'types/graphql.d';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_MELON}/status`, {
      headers: {
        key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
        authorization: `bearer ${ctx.req.headers.cookie?.replace('token=', '')}`,
      },
    });
    try {
      const { data } = await client.query<FindArticleQuery>({
        query: FindArticleDocument,
        variables: { articleId: ctx.query.id![0] },
      });
      return { props: { data: JSON.stringify(data.one) } };
    } catch {
      return { redirect: { destination: '/edit/no-title', permanent: false } };
    }
  } catch {
    return { redirect: { destination: '/login', permanent: false } };
  }
};

function Page({ data }: { data: Partial<Zenn & ZennAdds> }) {
  data = JSON.parse(String(data));
  return (
    <PageFrame classNmae={styles.post}>
      <>
        <Head>
          <title>Edit | LeMoN</title>
        </Head>
        {data && <Editor data={data} />}
      </>
    </PageFrame>
  );
}

export default memo(Page);

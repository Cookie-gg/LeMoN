import { memo } from 'react';
import { GetStaticProps } from 'utils/next';
import editQuery, { EditQueryType } from 'data/editQuery';
import styles from '../../assets/scss/pages/Edit.module.scss';
import { Heading, PageFrame, ArticleList, HeadMeta } from 'components';

function Page({ data }: { data: EditQueryType }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="Edit" ogImage={`${process.env.OG_IMAGE}/page/edit`} />
      <PageFrame classNmae={styles.page}>
        <>
          <Heading className={styles.heading} rank={1} text="PRIVATE" />
          <ArticleList className={styles.articles} data={data.all.articles} vertical editable type="private" />
          <Heading className={styles.heading} rank={1} text="PUBLIC" />
          <ArticleList className={styles.articles} data={data.all.articles} vertical editable type="public" />
        </>
      </PageFrame>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify(await editQuery()) },
  revalidate: 60,
});

export default memo(Page);

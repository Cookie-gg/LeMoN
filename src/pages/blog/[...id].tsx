import { useMount } from 'hooks';
import postQuery from 'data/postQuery';
import postIdQuery from 'data/postIdQuery';
import { useState } from 'react';
import { Zenn, ZennAdds } from 'types/common';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticPaths, GetStaticProps, Head } from 'utils/next';
import {
  ArticleMeta,
  PageFrame,
  ArticleToc,
  ArticleTopics,
  ArticleBody,
  Heading,
  ArticleList,
  DataRes,
} from 'components';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await postIdQuery();
  const paths: { params: { id: string[] } }[] = [];
  if (data) {
    data.allArticles.map((obj) => {
      paths.push({ params: { id: obj.id } });
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error } = await postQuery();
  if (data) {
    return {
      props: {
        data: JSON.stringify(data.allArticles.find((article) => article.id === params!.id![0])),
      },
    };
  } else {
    return { props: { error: JSON.stringify(error) } };
  }
};

export default function Post({ data, error }: { data: Zenn & ZennAdds; error?: string }) {
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const [table, _table] = useState<{ tagName: string; text: string; height: number }[]>([]);
  return (
    <>
      <Head>
        <title>LeMoN | {data.title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" />
      </Head>
      <DataRes error={error} />
      <PageFrame sectionClass={`${pages.post} ${isMounted && pages.mounted}`}>
        <>
          <ArticleMeta
            type="main"
            emoji={data.emoji}
            title={data.title}
            releaseDate={data.releaseDate}
            updateDate={data.updateDate}
          />
          <div className={pages.contents}>
            <main>
              <ArticleBody body={data.body} _table={_table} />
              <Heading rank={2} text={data.relations.title} className={pages.heading} />
              <ArticleList
                className={pages.relations}
                type="related"
                data={data.relations.articles}
                display={data.relations.articles.length}
                needDateParse
              />
            </main>
            <aside>
              <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} inArticle />
              <ArticleToc table={table}>
                <ArticleMeta
                  type="aside"
                  emoji={data.emoji}
                  title={data.title}
                  releaseDate={data.releaseDate}
                  updateDate={data.updateDate}
                />
              </ArticleToc>
            </aside>
          </div>
        </>
      </PageFrame>
    </>
  );
}

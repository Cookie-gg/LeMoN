import { memo, useEffect, useRef, useState } from 'react';
import postQuery from 'data/postQuery';
import postIdQuery from 'data/postIdQuery';
import { Zenn, ZennAdds } from 'types/common';
import { GetStaticPaths, GetStaticProps, useRouter } from 'utils/next';
import pages from '../../assets/scss/pages/Blog.module.scss';
import {
  ArticleMeta,
  PageFrame,
  ArticleToc,
  ArticleTopics,
  ArticleBody,
  Heading,
  ArticleList,
  DataRes,
  HeadMeta,
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
    return { props: { error: JSON.stringify(error) }, revalidate: 60 };
  }
};

function Post({ data, error }: { data: Zenn & ZennAdds; error?: string }) {
  data = JSON.parse(String(data));
  const [activeSection, _activeSection] = useState(0);
  const contentsRef = useRef<HTMLDivElement>(null);
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => _activeSection(0), [query]);
  return (
    <>
      <HeadMeta title={data.title} ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/article/${data.title}`}>
        <link rel="pagesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" />
      </HeadMeta>
      <DataRes error={error} />
      <PageFrame classNmae={pages.post}>
        <>
          <ArticleMeta
            emoji={data.emoji}
            title={data.title}
            releaseDate={data.releaseDate}
            updateDate={data.updateDate}
          />
          <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} className={pages.topics} inArticle />
          <div className={pages.contents} ref={contentsRef}>
            <main>
              <ArticleBody
                body={data.body}
                headingTexts={data.headings ? data.headings.map((heading) => heading.text) : undefined}
                _activeSection={(n: number) => _activeSection(n)}
              >
                <ArticleToc
                  meta={{ title: data.title, emoji: data.emoji }}
                  activeSection={activeSection}
                  _activeSection={(n: number) => _activeSection(n)}
                  headings={data.headings}
                />
              </ArticleBody>
              <Heading rank={2} text={data.relations.title} className={pages.heading} />
              <ArticleList
                vertical
                className={pages.relations}
                data={data.relations.articles}
                display={data.relations.articles.length}
                needDateParse
              />
            </main>
            <aside>
              <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} inArticle />
              <ArticleToc
                meta={{ title: data.title, emoji: data.emoji }}
                activeSection={activeSection}
                headings={data.headings}
                className={pages.toc}
                _activeSection={(n: number) => _activeSection(n)}
              />
            </aside>
          </div>
        </>
      </PageFrame>
    </>
  );
}

export default memo(Post);

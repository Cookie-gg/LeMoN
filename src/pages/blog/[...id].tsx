import { useRef, useState } from 'react';
import { useIntersect, useMount, useWindowDimensions } from 'hooks';
import postQuery from 'data/postQuery';
import postIdQuery from 'data/postIdQuery';
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
import { Twemoji } from 'react-emoji-render';

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

export default function Post({ data, error }: { data: Zenn & ZennAdds; error?: string }) {
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const [activeSection, _activeSection] = useState(0);
  const contentsRef = useRef<HTMLDivElement>(null);
  const window = useWindowDimensions() as { width: number; height: number };
  const isIntersecting = useIntersect(
    contentsRef.current,
    `0px 0px -${
      window.height - (window.width < 820 ? (window.width < 500 ? 11 + window.width * 0.165 : 11 + 20 + 60) : 151)
    }px`,
  );
  return (
    <>
      <Head>
        <title>LeMoN | {data.title}</title>
        <link rel="pagesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" />
      </Head>
      <DataRes error={error} />
      <PageFrame classNmae={`${pages.post} ${isMounted && pages.mounted}`}>
        <>
          <ArticleMeta
            emoji={data.emoji}
            title={data.title}
            releaseDate={data.releaseDate}
            updateDate={data.updateDate}
          />
          {window.width < 1200 && (
            <>
              <div className={`${pages.fixed_meta} ${isIntersecting && pages.showed}`}>
                <div className={pages.inner}>
                  <Twemoji svg onlyEmojiClassName={pages.emoji} text={data.emoji} options={{ protocol: 'https' }} />
                  <h1 className={pages.title}>{data.title}</h1>
                </div>
              </div>
              <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} inArticle />
            </>
          )}
          <div className={pages.contents} ref={contentsRef}>
            <main>
              <ArticleBody
                body={data.body}
                headingTexts={data.headings ? data.headings.map((heading) => heading.text) : undefined}
                _activeSection={(n: number) => _activeSection(n)}
              />
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
              {!(window.width < 1200) && (
                <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} inArticle />
              )}
              <ArticleToc
                meta={{ title: data.title, emoji: data.emoji }}
                activeSection={activeSection}
                headings={data.headings}
              />
            </aside>
          </div>
        </>
      </PageFrame>
    </>
  );
}

import postQuery from 'data/postQuery';
import post from 'assets/json/post.json';
import postIdQuery from 'data/postIdQuery';
import { Zenn, ZennAdds } from 'types/common';
import { memo, useEffect, useRef, useState } from 'react';
import styles from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticPaths, GetStaticProps, useRouter } from 'utils/next';
import {
  Heading,
  HeadMeta,
  PageFrame,
  ArticleToc,
  ArticleBody,
  ArticleMeta,
  ArticleList,
  ArticleTopics,
} from 'components';

function Post({ data }: { data: Zenn & ZennAdds }) {
  data = JSON.parse(String(data));
  const contentsRef = useRef<HTMLDivElement>(null);
  const [activeSection, _activeSection] = useState(0);
  const query = (useRouter().query as { id: string[] }).id[0];
  useEffect(() => _activeSection(0), [query]);
  return (
    <>
      <HeadMeta title={data.title} ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/article/${data.title}`}>
        <link rel="pagesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" />
      </HeadMeta>
      <PageFrame classNmae={styles.post}>
        <>
          <ArticleMeta
            emoji={data.emoji}
            title={data.title}
            releaseDate={data.releaseDate}
            updateDate={data.updateDate}
          />
          <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} className={styles.topics} inArticle />
          <div className={styles.contents} ref={contentsRef}>
            <main>
              <ArticleBody
                body={data.body}
                headingTexts={data.headings ? data.headings.map((heading) => heading.text) : undefined}
                _activeSection={(n: number) => _activeSection(n)}
              >
                <ArticleToc
                  meta={{ title: data.title, emoji: data.emoji }}
                  activeSection={activeSection}
                  headings={data.headings}
                />
              </ArticleBody>
              <Heading rank={2} text={post.relations.title} className={styles.heading} />
              <ArticleList
                vertical
                className={styles.relations}
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
                className={styles.toc}
              />
            </aside>
          </div>
        </>
      </PageFrame>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await postIdQuery()).allArticles.map((obj) => ({ params: { id: obj.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    data: JSON.stringify((await postQuery()).allArticles.find((article) => article.id === params!.id![0])),
  },
});

export default memo(Post);

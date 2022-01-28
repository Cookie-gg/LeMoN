import post from 'assets/json/post.json';
import { Zenn, ZennAdds } from 'types/common';
import { memo, useEffect, useState } from 'react';
import styles from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticPaths, GetStaticProps, useRouter } from 'utils/next';
import {
  Heading,
  HeadMeta,
  PageFrame,
  EditButton,
  ArticleToc,
  ArticleBody,
  ArticleMeta,
  ArticleList,
  ArticleTopics,
} from 'components';
import { publicState } from 'utils/common';
import blogQuery from 'data/blogQuery';

function Page({ data, auth }: { data: Zenn & ZennAdds; auth: { state: boolean } }) {
  const router = useRouter();
  data = JSON.parse(String(data));
  const [activeSection, _activeSection] = useState(0);
  useEffect(() => _activeSection(0), [router.query.id]);

  return (
    <>
      <HeadMeta title={data.title} type="article" />
      <PageFrame className={styles.post}>
        <>
          <ArticleMeta
            emoji={data.emoji}
            title={data.title}
            published={data.published}
            releaseDate={data.releaseDate}
            updateDate={data.updateDate}
          />
          {auth.state && <EditButton articleId={data.articleId} className={styles.edit} />}
          <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} className={styles.topics} inArticle />
          <div className={styles.contents}>
            {data.headings && data.headings.length > 0 && (
              <ArticleToc
                meta={{ title: data.title, emoji: data.emoji }}
                activeSection={activeSection}
                headings={data.headings}
                className={styles.toc}
              />
            )}
            <ArticleBody
              html={data.html}
              headingTexts={data.headings ? data.headings.map((heading) => heading.text) : undefined}
              _activeSection={(n: number) => _activeSection(n)}
              className={styles.body}
            />
          </div>
          <div className={styles.relations}>
            <Heading rank={2} text={post.relations.title} className={styles.heading} />
            <ArticleList vertical className={styles.articles} data={publicState(data.relations.articles, auth.state)} />
          </div>
        </>
      </PageFrame>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await blogQuery()).id.paths,
  fallback: false,
});
export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    data: JSON.stringify((await blogQuery()).id.articles.find((article) => article.articleId === params!.id![0])),
    revalidate: 60,
  },
});

export default memo(Page);

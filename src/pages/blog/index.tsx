import { useState, memo } from 'react';
import blog from 'assets/json/blog.json';
import { Icon as Iconify } from '@iconify/react';
import { GetStaticProps, Link } from 'utils/next';
import blogQuery, { BlogQueryType } from 'data/blogQuery';
import styles from '../../assets/scss/pages/Blog.module.scss';
import { useFindMoreArticlesLazyQuery } from 'types/graphql.d';
import { Heading, PageFrame, ArticleList, Button, ArticleTopics, HeadMeta } from 'components';
import { publicState } from 'utils/common';

function Page({ data, auth }: { data: BlogQueryType<'index'>; auth: { state: boolean } }) {
  data = JSON.parse(String(data));
  const filteredArticles = publicState(data.all.articles, auth.state);
  const [all, _all] = useState(filteredArticles.slice(4, 8));
  const [selectedTopic, _selectedTopic] = useState(0);
  const [getMore, { loading }] = useFindMoreArticlesLazyQuery();
  return (
    <>
      <HeadMeta title={blog.title} />
      <PageFrame className={styles.page}>
        <>
          <Heading className={styles.heading} rank={1} text={blog.latest.title} />
          <ArticleList className={styles.articles} data={filteredArticles.slice(0, 4)} vertical />
          <Heading className={styles.heading} rank={1} text={blog.topTopics.title} />
          <ArticleList
            className={styles.articles}
            data={data.topTopics.articles.map((article) => publicState(article, auth.state))[selectedTopic]}
            vertical
            shiftList={
              <ArticleTopics
                topics={data.topTopics.topics}
                icons={data.topTopics.icons}
                activeNumber={selectedTopic}
                clickEvent={(n) => _selectedTopic(n)}
              />
            }
          />
          {filteredArticles.length >= 4 && (
            <>
              <Heading className={styles.heading} rank={1} text={blog.all.title} />
              <ArticleList horizontal className={styles.articles} data={all} />
              {loading && <Iconify fr={''} icon="eos-icons:loading" className={styles.loading} />}
              <Button
                className={styles.more}
                isInteractive={true}
                switching={data.all.length === all.length + 4}
                clickEvent={async () => {
                  const res = await getMore({ variables: { current: String(all.length + 4) } });
                  if (res.data) {
                    _all((prev) => [
                      ...prev,
                      ...(res.data
                        ? res.data.articles.map((obj) => ({
                            articleId: obj.articleId,
                            published: obj.published,
                            releaseDate: obj.releaseDate,
                            title: obj.title,
                            emoji: obj.emoji,
                            type: obj.type,
                            topics: obj.topicIcons.map((obj) => obj.displayName),
                          }))
                        : []),
                    ]);
                  }
                }}
              >
                <Link href="/blog/topics">
                  <a>トピックごとに表示</a>
                </Link>
                <span>さらに表示</span>
              </Button>
            </>
          )}
        </>
      </PageFrame>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify((await blogQuery()).index) },
  revalidate: 60,
});

export default memo(Page);

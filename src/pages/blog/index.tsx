import { useMount } from 'hooks';
import blogQuery, { DataType } from 'data/blogQuery';
import { scrollTopCashe } from 'components/PageFrame';
import { useState, useEffect, useCallback } from 'react';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticProps, Head, useRouter } from 'utils/next';
import { Heading, PageFrame, ArticleList, Button, Nlink, ArticleTopics, DataRes } from 'components';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await blogQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

export default function Blog({ data, error }: { data: DataType; error?: string }) {
  const router = useRouter();
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const [displayNum, _displayNum] = useState(2);
  const [selectedTopic, _selectedTopic] = useState(0);
  useEffect(() => _displayNum(router.query.display ? Number(router.query.display) : 2), [router.query.display]);
  const _displayNumHandler = useCallback(() => {
    if (!(data.all.articles.length === displayNum)) {
      _displayNum((prev) => {
        const displayNum = data.all.articles.length <= prev + 6 ? data.all.articles.length : prev + 6;
        scrollTopCashe.del(`/blog?display=${displayNum}`);
        router.push({ query: { display: displayNum } });
        return displayNum;
      });
    }
  }, [router, displayNum, data]);
  return (
    <>
      <Head>
        <title>LeMoN | Blog</title>
      </Head>
      <DataRes error={error} />
      <PageFrame classNmae={`${pages.blog} ${pages.entire} ${isMounted && pages.mounted}`}>
        <>
          <Heading className={pages.heading} rank={1} text={data.latest.title} />
          <ArticleList
            className={pages.articles}
            type="latest"
            data={data.latest.articles}
            display={data.latest.articles.length}
          />
          <Heading className={pages.heading} rank={1} text={data.topTopics.title} />
          <ArticleList
            className={pages.articles}
            type="latest"
            data={data.topTopics.articles[selectedTopic]}
            display={3}
            shiftList={
              <ArticleTopics
                topics={data.topTopics.topics}
                icons={data.topTopics.icons}
                activeNumber={selectedTopic}
                clickEvent={(n: number) => _selectedTopic(n)}
              />
            }
          />
          <Heading className={pages.heading} rank={1} text={data.all.title} />
          <ArticleList className={pages.articles} data={data.all.articles} display={displayNum} />
          <Button
            className={pages.more}
            isInteractive={true}
            switching={data.all.articles.length === displayNum}
            clickEvent={_displayNumHandler}
          >
            <Nlink href="/blog/topics">
              <>トピックごとに表示</>
            </Nlink>
            <span>さらに表示</span>
          </Button>
        </>
      </PageFrame>
    </>
  );
}

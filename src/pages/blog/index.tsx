import { useMount } from 'hooks';
import DataResponse from 'components/DataRes';
import useClientBlog from 'data/clientBlogQuery';
import blogQuery, { DataType } from 'data/blogQuery';
import { scrollTopCashe } from 'components/PageFrame';
import { useState, useEffect, useCallback } from 'react';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { GetServerSideProps, Head, useRouter } from 'utils/next';
import { Heading, PageFrame, ArticleList, Button, Nlink, ArticleTopics, DataRes } from 'components';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await blogQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) } };
};

export default function Blog({ data, error }: { data: DataType; error?: string }) {
  const router = useRouter();
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const [displayNum, _displayNum] = useState(2);
  const [selectedTopic, _selectedTopic] = useState(0);
  const { clientData, loading, clientError } = useClientBlog(String(displayNum + 4));
  useEffect(() => _displayNum(router.query.display ? Number(router.query.display) : 2), [router.query.display]);
  const _displayNumHandler = useCallback(() => {
    if (!(data.all.length === displayNum)) {
      _displayNum((prev) => {
        const displayNum = data.all.length <= prev + 6 ? data.all.length : prev + 6;
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
      <PageFrame sectionClass={`${pages.blog} ${isMounted && pages.mounted}`}>
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
          {clientData && <ArticleList className={pages.articles} data={clientData.articles} display={displayNum} />}
          <DataResponse loading={loading} error={clientError} />
          <Button
            className={pages.more}
            isInteractive={true}
            switching={data.all.length === displayNum}
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

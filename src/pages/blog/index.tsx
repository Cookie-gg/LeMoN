import blogQuery, { BlogQueryType } from 'data/blogQuery';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticProps, Link, useRouter } from 'utils/next';
import { useState, useEffect, useCallback, memo } from 'react';
import { Heading, PageFrame, ArticleList, Button, ArticleTopics, HeadMeta } from 'components';

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify(await blogQuery()) },
  revalidate: 60,
});

function Blog({ data }: { data: BlogQueryType }) {
  data = JSON.parse(String(data));
  const router = useRouter();
  const [displayNum, _displayNum] = useState(data.all.articles.length);
  const [selectedTopic, _selectedTopic] = useState(0);
  useEffect(
    () => _displayNum(router.query.display ? Number(router.query.display) : data.all.articles.length),
    [router.query.display, data.all.articles.length],
  );
  const _displayNumHandler = useCallback(() => {
    if (!(data.all.articles.length === displayNum)) {
      _displayNum((prev) => {
        const displayNum = data.all.articles.length <= prev + 6 ? data.all.articles.length : prev + 6;
        router.push({ query: { display: displayNum } });
        return displayNum;
      });
    }
  }, [router, displayNum, data]);
  return (
    <>
      <HeadMeta title="Blog" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Blog`} />
      <PageFrame classNmae={pages.blog}>
        <>
          <Heading className={pages.heading} rank={1} text={data.latest.title} />
          <ArticleList
            className={pages.articles}
            data={data.latest.articles}
            display={data.latest.articles.length}
            vertical
          />
          <Heading className={pages.heading} rank={1} text={data.topTopics.title} />
          <ArticleList
            className={pages.articles}
            data={data.topTopics.articles[selectedTopic]}
            display={data.topTopics.articles[selectedTopic].length}
            vertical
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
          <ArticleList horizontal className={pages.articles} data={data.all.articles} display={displayNum} />
          <Button
            className={pages.more}
            isInteractive={true}
            switching={data.all.articles.length === displayNum}
            clickEvent={_displayNumHandler}
          >
            <Link href="/blog/topics">
              <a>トピックごとに表示</a>
            </Link>
            <span>さらに表示</span>
          </Button>
        </>
      </PageFrame>
    </>
  );
}

export default memo(Blog);

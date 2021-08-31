import { useMount } from 'hooks';
import { sortByDate } from 'utils/common';
import { Head, useRouter } from 'utils/next';
import { useState, useEffect, useCallback } from 'react';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { Heading, PageFrame, ArticleList, Button, Nlink } from 'components';

// from data base
const data = {
  latest: {
    title: 'Latest',
    articles: sortByDate('desc', [
      {
        id: 'zenn',
        releaseDate: new Date(2021, 8, 10),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '📝',
        type: 'tech',
        topics: ['Zenn', 'TypeScript'],
      },
      {
        id: 'markdown-guide',
        releaseDate: new Date(2021, 9, 6),
        title: 'ZennのMarkdown記法一覧',
        emoji: '👩‍💻',
        type: 'tech',
        topics: ['Zenn', 'Markdown'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 8, 10),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '📘',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
    ]),
  },
  all: {
    title: 'Articles',
    articles: sortByDate('desc', [
      {
        id: 'zenn',
        releaseDate: new Date(2020, 8, 10),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '📘',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 10),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '🍋',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2021, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 1, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['TypeScript'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 1, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 31),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn', 'TypeScript'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn', 'TypeScript'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn', 'TypeScript'],
      },
      {
        id: 'zenn',
        releaseDate: new Date(2020, 4, 11),
        title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
        emoji: '💻',
        type: 'tech',
        topics: ['Zenn'],
      },
    ]),
  },
};
// const topics = ['all', ...Array.from(new Set(data.articles.exSpecifor(4, (el) => el.topics).flat()))];

export default function Blog() {
  const router = useRouter();
  const isMounted = useMount();
  const [displayNum, _displayNum] = useState(4);
  useEffect(() => _displayNum(router.query.display ? Number(router.query.display) : 4), [router.query.display]);
  const clickEvent = useCallback(() => {
    _displayNum((prev) => {
      if (!(data.all.articles.length === prev)) {
        if (data.all.articles.length <= prev + 6) {
          router.push({
            pathname: router.pathname,
            query: { display: data.all.articles.length },
          });
          return data.all.articles.length;
        } else {
          router.push({
            pathname: router.pathname,
            query: { display: prev + 6 },
          });
          return prev + 6;
        }
      } else return prev;
    });
  }, [router]);
  return (
    <>
      <Head>
        <title>LeMoN | Blog</title>
      </Head>
      <PageFrame sectionClass={`${pages.blog} ${isMounted && pages.mounted}`}>
        <>
          {
            <>
              <Heading className={pages.heading} rank={1} text={data.latest.title} />
              <ArticleList className={pages.articles} type="latest" data={data.latest.articles} />
              <div className={pages.column}>
                <Heading className={pages.heading} rank={1} text={data.all.title} />
                <Button className={pages.to_topics}>
                  <Nlink href="/blog/topics">
                    <>トピックごとに表示</>
                  </Nlink>
                </Button>
              </div>
              <ArticleList className={pages.articles} data={data.all.articles} displayNum={displayNum} />
              <Button
                className={pages.more}
                isInteractive={true}
                switching={displayNum === data.all.articles.length}
                clickEvent={clickEvent}
              >
                <Nlink href="/blog/topics">
                  <>トピックごとに表示</>
                </Nlink>
                <a>さらに表示</a>
              </Button>
            </>
          }
        </>
      </PageFrame>
    </>
  );
}

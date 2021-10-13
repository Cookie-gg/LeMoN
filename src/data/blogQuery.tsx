import { Zenn } from 'types/common';
import { section } from 'utils/common';
import { client } from 'graphql/query/config.gql';
import { BlogDocument, BlogQuery } from 'types/graphql.d';

export interface BlogQueryType {
  latest: {
    title: string;
    articles: Zenn[];
  };
  topTopics: {
    title: string;
    topics: string[];
    icons: string[];
    articles: Zenn[][];
  };
  all: {
    title: string;
    articles: Zenn[];
  };
}

export default async function blogQuery(): Promise<BlogQueryType> {
  const { error, data } = await client.query<BlogQuery>({ query: BlogDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const topTopics = data.topics.sortObj('allArticles', 'asc', true).slice(0, 3);
    const shapedData: BlogQueryType = {
      latest: {
        title: titles.latest.text,
        articles: data.latest.map((obj) => ({
          id: obj.articleId,
          published: obj.published,
          releaseDate: obj.releaseDate,
          title: obj.title,
          emoji: obj.emoji,
          type: obj.type,
          topics: obj.topicIcons.map((obj) => obj.displayName),
        })),
      },
      topTopics: {
        title: titles.topTopics.text,
        topics: topTopics.map((obj) => obj.displayName),
        icons: topTopics.map((obj) => obj.icon),
        articles: topTopics.map((obj) =>
          obj.someArticles.map((_obj) => ({
            id: _obj.articleId,
            published: _obj.published,
            releaseDate: _obj.releaseDate,
            title: _obj.title,
            emoji: _obj.emoji,
            type: _obj.type,
            topics: _obj.topicIcons.map((_obj) => _obj.displayName),
          })),
        ),
      },
      all: {
        title: titles.all.text,
        articles: data.all.map((obj) => ({
          id: obj.articleId,
          published: obj.published,
          releaseDate: obj.releaseDate,
          title: obj.title,
          emoji: obj.emoji,
          type: obj.type,
          topics: obj.topicIcons.map((obj) => obj.displayName),
        })),
      },
    };
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

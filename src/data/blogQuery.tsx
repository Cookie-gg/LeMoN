import { Zenn } from 'types/common';
import { client } from 'graphql/config.gql';
import { BlogDocument, BlogQuery } from 'types/graphql.d';

export interface BlogQueryType {
  latest: {
    articles: Zenn[];
  };
  topTopics: {
    topics: string[];
    icons: string[];
    articles: Zenn[][];
  };
  all: {
    articles: Zenn[];
  };
}

export default async function blogQuery(): Promise<BlogQueryType> {
  const { error, data } = await client.query<BlogQuery>({ query: BlogDocument });
  if (data) {
    const topTopics = data.topics.sortObj('allArticles', 'asc', true).slice(0, 3);
    const shapedData: BlogQueryType = {
      latest: {
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

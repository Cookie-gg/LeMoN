import { Zenn } from 'types/common';
import { client } from 'graphql/config.gql';
import { BlogDocument, BlogQuery } from 'types/graphql.d';

export interface BlogQueryType {
  all: {
    limit: number;
    articles: Zenn[];
  };
  topTopics: {
    topics: string[];
    icons: string[];
    articles: Zenn[][];
  };
}

export default async function blogQuery(): Promise<BlogQueryType> {
  const { error, data } = await client.query<BlogQuery>({ query: BlogDocument });
  if (data) {
    const topTopics = data.topics.sortObj('allArticles', 'desc', true);
    const shapedData: BlogQueryType = {
      all: {
        limit: data.num,
        articles: data.all
          .map((obj) => ({
            articleId: obj.articleId,
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
            articleId: _obj.articleId,
            published: _obj.published,
            releaseDate: _obj.releaseDate,
            title: _obj.title,
            emoji: _obj.emoji,
            type: _obj.type,
            topics: _obj.topicIcons.map((_obj) => _obj.displayName),
          })),
        ),
      },
    };
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

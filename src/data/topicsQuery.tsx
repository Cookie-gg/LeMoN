import { Zenn } from 'types/common';
import { client } from 'graphql/config.gql';
import { TopicsDocument, TopicsQuery } from 'types/graphql.d';

export interface TopicQueryType {
  topics: {
    name: string;
    icon: string;
    articles: Zenn[];
  }[];
}

export default async function topicsQuery(): Promise<TopicQueryType> {
  const { error, data } = await client.query<TopicsQuery>({ query: TopicsDocument });
  if (data) {
    const shapedData: TopicQueryType = {
      topics: data.topics
        .filter((obj) => obj.allArticles.length > 0)
        .sortObj('displayName', 'desc')
        .map((obj) => ({
          name: obj.displayName,
          icon: obj.icon,
          articles: obj.allArticles.map((obj) => ({
            id: obj.articleId,
            published: obj.published,
            releaseDate: obj.releaseDate,
            title: obj.title,
            emoji: obj.emoji,
            type: obj.type,
            topics: obj.topicIcons.map((obj) => obj.displayName),
          })),
        })),
    };
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

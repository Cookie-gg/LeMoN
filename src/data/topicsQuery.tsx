import { ApolloError } from '@apollo/client';
import { client } from 'graphql/config.gql';
import { Zenn } from 'types/common';
import { TopicsDocument, TopicsQuery } from 'types/graphql.d';
import { section } from 'utils/common';

export interface DataType {
  title: string;
  topics: {
    name: string;
    icon: string;
    articles: Zenn[];
  }[];
}

export default async function topicsQuery(): Promise<{ data: DataType | undefined; error: ApolloError | undefined }> {
  const { error, data } = await client.query<TopicsQuery>({ query: TopicsDocument });
  if (data) {
    const titles = section(data.titles);
    const shapedData: DataType = {
      title: titles.all,
      topics: data.topics
        .filter((obj) => obj.allArticles.length > 0)
        .sortObj('displayName', 'desc')
        .map((obj) => ({
          name: obj.displayName,
          icon: obj.icon,
          articles: obj.allArticles.map((obj) => ({
            id: obj.id,
            releaseDate: obj.releaseDate,
            title: obj.title,
            emoji: obj.emoji,
            type: obj.type,
            topics: obj.topicIcons.map((obj) => obj.displayName),
          })),
        })),
    };
    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

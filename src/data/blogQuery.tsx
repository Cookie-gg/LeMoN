import { Zenn } from 'types/common';
import { section } from 'utils/common';
import { BlogDocument, BlogQuery } from 'types/graphql.d';
import { ApolloError } from '@apollo/client';
import { client } from 'pages/_app';

export interface DataType {
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
    length: number;
  };
}

export default async function blogQuery(): Promise<{
  data: DataType | undefined;
  error: ApolloError | undefined;
}> {
  const { error, data } = await client.query<BlogQuery>({ query: BlogDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const topTopics = data.topics.sortObj('allArticles', 'asc', true).slice(0, 3);
    const shapedData: DataType = {
      latest: {
        title: titles.latest,
        articles: data.latest.map((obj) => ({
          id: obj.id,
          releaseDate: new Date(obj.releaseDate),
          title: obj.title,
          emoji: obj.emoji,
          type: obj.type,
          topics: obj.topicIcons.map((obj) => obj.displayName),
        })),
      },
      topTopics: {
        title: titles.topTopics,
        topics: topTopics.map((obj) => obj.displayName),
        icons: topTopics.map((obj) => obj.icon),
        articles: topTopics.map((obj) =>
          obj.someArticles.map((_obj) => ({
            id: _obj.id,
            releaseDate: new Date(_obj.releaseDate),
            title: _obj.title,
            emoji: _obj.emoji,
            type: _obj.type,
            topics: _obj.topicIcons.map((_obj) => _obj.displayName),
          })),
        ),
      },
      all: {
        title: titles.all,
        length: data.numberOfArticles - 4,
      },
    };
    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

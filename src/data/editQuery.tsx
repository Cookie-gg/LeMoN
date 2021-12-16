import { Zenn } from 'types/common';
import { client } from 'graphql/config.gql';
import { BlogDocument, EditQuery } from 'types/graphql.d';

export interface EditQueryType {
  all: {
    articles: Zenn[];
  };
}

export default async function blogQuery(): Promise<EditQueryType> {
  const { error, data } = await client.query<EditQuery>({ query: BlogDocument });
  if (data) {
    const shapedData: EditQueryType = {
      all: {
        articles: data.all.map((obj) => ({
          articleId: obj.articleId,
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

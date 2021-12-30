import { Zenn } from 'types/common';
import { client } from 'graphql/config.gql';
import { FindAllArticlesDocument, FindAllArticlesQuery } from 'types/graphql.d';

export interface EditQueryType {
  articles: Zenn[];
}

export default async function editQuery(): Promise<EditQueryType> {
  const { error, data } = await client.query<FindAllArticlesQuery>({ query: FindAllArticlesDocument });
  if (data) {
    const shapedData: EditQueryType = {
      articles: data.articles.map((obj) => ({
        articleId: obj.articleId,
        published: obj.published,
        releaseDate: obj.releaseDate,
        title: obj.title,
        emoji: obj.emoji,
        type: obj.typeIcon.displayName,
        topics: obj.topicIcons.map((topic) => topic.displayName),
      })),
    };
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

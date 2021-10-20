import { client } from 'graphql/config.gql';
import { PostDocument, PostQuery } from 'types/graphql.d';

interface PostIdQueryType {
  allArticles: {
    id: string[];
  }[];
}

export default async function postIdQuery(): Promise<PostIdQueryType> {
  const { data, error } = await client.query<PostQuery>({ query: PostDocument });
  if (data) {
    const shapedData: PostIdQueryType = {
      allArticles: data.allArticles.map((obj) => ({
        id: [obj.articleId],
      })),
    };
    return shapedData;
  } else {
    throw new Error(`error message ${error}`);
  }
}

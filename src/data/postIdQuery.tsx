import { client } from 'graphql/config.gql';
import { ApolloError } from '@apollo/client';
import { PostDocument, PostQuery } from 'types/graphql.d';

interface DataType {
  allArticles: {
    id: string[];
  }[];
}

export default async function postIdQuery(): Promise<{
  data: DataType | undefined;
  error: ApolloError | undefined;
}> {
  const { data, error } = await client.query<PostQuery>({ query: PostDocument });
  if (data) {
    const shapedData: DataType = {
      allArticles: data.allArticles.map((obj) => ({
        id: [obj.id],
      })),
    };
    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

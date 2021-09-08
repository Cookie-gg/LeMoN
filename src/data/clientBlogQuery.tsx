import { Zenn } from 'types/common';
import { ApolloError } from '@apollo/client';
import { useClientBlogQuery } from 'types/graphql.d';

interface DataType {
  articles: Zenn[];
}

export default function useClientBlog(displayNum: string): {
  clientData: DataType | undefined;
  loading: boolean;
  clientError: ApolloError | undefined;
} {
  const { error, data, loading } = useClientBlogQuery({ variables: { displayNum } });
  if (data) {
    const shapedData: DataType = {
      articles: data.articles.map((obj) => ({
        id: obj.id,
        releaseDate: new Date(obj.releaseDate),
        title: obj.title,
        emoji: obj.emoji,
        type: obj.type,
        topics: obj.topicIcons.map((obj) => obj.displayName),
      })),
    };
    return { clientData: shapedData, loading, clientError: error };
  } else {
    return { clientData: undefined, loading, clientError: error };
  }
}

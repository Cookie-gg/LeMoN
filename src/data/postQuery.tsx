import { client } from 'pages/_app';
import { ApolloError } from '@apollo/client';
import { Zenn, ZennAdds } from 'types/common';
import { PostDocument, PostQuery } from 'types/graphql.d';
import { section } from 'utils/common';

interface DataType {
  allArticles: (Zenn & ZennAdds)[];
}

export default async function postQuery(): Promise<{
  data: DataType | undefined;
  error: ApolloError | undefined;
}> {
  const { data, error } = await client.query<PostQuery>({ query: PostDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const shapedData: DataType = {
      allArticles: data.allArticles.map((obj) => ({
        id: obj.id,
        releaseDate: new Date(obj.releaseDate),
        updateDate: new Date(obj.updateDate),
        title: obj.title,
        emoji: obj.emoji,
        type: obj.typeIcon.displayName,
        topics: obj.topicIcons.map((obj) => obj.displayName),
        icons: [...obj.topicIcons.map((obj) => obj.icon), obj.typeIcon.icon],
        body: obj.body,
        relations: {
          articles: obj.relations.map((obj) => ({
            id: obj.id,
            releaseDate: new Date(obj.releaseDate),
            title: obj.title,
            emoji: obj.emoji,
            type: obj.type,
            topics: obj.topicIcons.map((obj) => obj.displayName),
          })),
          title: titles.relations,
        },
      })),
    };
    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

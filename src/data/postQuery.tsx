import { client } from 'graphql/config.gql';
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
      allArticles: data.allArticles.map((obj) => {
        const headings = obj.body.match(/\<(h1|h2).*?\>(.*?)\<\/(h1|h2)\>/g);
        return {
          id: obj.id,
          releaseDate: new Date(obj.releaseDate),
          updateDate: new Date(obj.updateDate),
          title: obj.title,
          emoji: obj.emoji,
          type: obj.typeIcon.displayName,
          topics: obj.topicIcons.map((obj) => obj.displayName),
          icons: [...obj.topicIcons.map((obj) => obj.icon), obj.typeIcon.icon],
          body: obj.body,
          headings: headings
            ? headings.map((heading: string) => ({
                level: String(heading).split('')[2] === '1' ? 1 : 2,
                text: String(heading).replaceAll(/\<(.*?)\>/g, ''),
              }))
            : undefined,
          relations: {
            articles: obj.relations.map((obj) => ({
              id: obj.id,
              releaseDate: new Date(obj.releaseDate),
              title: obj.title,
              emoji: obj.emoji,
              type: obj.type,
              topics: obj.topicIcons.map((obj) => obj.displayName),
            })),
            title: titles.relations.text,
          },
        };
      }),
    };
    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

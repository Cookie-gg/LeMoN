import { section } from 'utils/common';
import { Zenn, ZennAdds } from 'types/common';
import { client } from 'graphql/config.gql';
import { PostDocument, PostQuery } from 'types/graphql.d';

interface PostQueryType {
  allArticles: (Zenn & ZennAdds)[];
}

export default async function postQuery(): Promise<PostQueryType> {
  const { data, error } = await client.query<PostQuery>({ query: PostDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const shapedData: PostQueryType = {
      allArticles: data.allArticles.map((obj) => {
        const headings = obj.body.match(/\<(h1|h2).*?\>(.*?)\<\/(h1|h2)\>/g);
        return {
          id: obj.articleId,
          published: obj.published,
          releaseDate: obj.releaseDate,
          updateDate: obj.updateDate,
          title: obj.title,
          emoji: obj.emoji,
          type: obj.typeIcon.displayName,
          topics: obj.topicIcons.map((obj) => obj.displayName),
          icons: [...obj.topicIcons.map((obj) => obj.icon), obj.typeIcon.icon],
          body: obj.body,
          headings: headings
            ? headings.map((heading) => ({
                level: heading.split('')[2] === '1' ? 1 : 2,
                text: heading.replace(/\<(.*?)\>/g, ''),
              }))
            : undefined,
          relations: {
            articles: obj.relations.map((obj) => ({
              id: obj.articleId,
              published: obj.published,
              releaseDate: obj.releaseDate,
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
    return shapedData;
  } else {
    throw new Error(`error message ${error}`);
  }
}

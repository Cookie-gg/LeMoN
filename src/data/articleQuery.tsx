import { client } from 'graphql/config.gql';
import { Zenn, ZennAdds } from 'types/common';
import { GetArticleQuery, GetArticleDocument } from 'types/graphql.d';

interface ArticleQueryType {
  id: { id: string[] }[];
  articles: (Zenn & ZennAdds)[];
}

export default async function articleQuery(): Promise<ArticleQueryType> {
  const { data, error } = await client.query<GetArticleQuery>({ query: GetArticleDocument });
  if (data) {
    const shapedData: ArticleQueryType = {
      id: data.articles.map((obj) => ({ id: [obj.articleId] })),
      articles: data.articles.map((obj) => {
        const headings = obj.html.match(/\<(h1|h2).*?\>(.*?)\<\/(h1|h2)\>/g);
        return {
          id: obj.id,
          articleId: obj.articleId,
          published: obj.published,
          releaseDate: obj.releaseDate,
          updateDate: obj.updateDate,
          title: obj.title,
          emoji: obj.emoji,
          type: obj.typeIcon.displayName,
          topics: obj.topicIcons.map((obj) => obj.displayName),
          icons: [...obj.topicIcons.map((obj) => obj.icon), obj.typeIcon.icon],
          markdown: obj.markdown,
          html: obj.html,
          headings: headings
            ? headings.map((heading) => ({
                level: heading.split('')[2] === '1' ? 1 : 2,
                text: heading.replace(/\<(.*?)\>/g, ''),
              }))
            : undefined,
          relations: {
            articles: obj.relations.map((obj) => ({
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
      }),
    };
    return shapedData;
  } else {
    throw new Error(`error message ${error}`);
  }
}

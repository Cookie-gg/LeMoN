import { Zenn, ZennAdds } from 'types/common';
import { client } from 'graphql/config.gql';
import {
  FindAllArticlesDocument,
  FindAllArticlesQuery,
  FindAllTopicsDocument,
  FindAllTopicsQuery,
} from 'types/graphql.d';

interface Index {
  all: {
    articles: Zenn[];
    length: number;
  };
  topTopics: {
    topics: string[];
    icons: string[];
    articles: Zenn[][];
  };
}
interface Id {
  paths: { params: { id: string[] } }[];
  articles: (Zenn & ZennAdds)[];
}
interface Topics {
  all: {
    name: string;
    icon: string;
    articles: Zenn[];
  }[];
}

export type BlogQueryType<T> = T extends 'index' ? Index : T extends 'id' ? Id : Topics;

export default async function blogQuery(): Promise<{ index: Index; id: Id; topics: Topics }> {
  const data = {
    ...(await client.query<FindAllArticlesQuery>({ query: FindAllArticlesDocument })).data,
    ...(await client.query<FindAllTopicsQuery>({ query: FindAllTopicsDocument })).data,
  };
  if (data) {
    const topics = data.topics.slice().sort((a, b) => {
      return a.allArticles.length > b.allArticles.length ? -1 : a.allArticles.length < b.allArticles.length ? 1 : 0;
    });
    const shapedData: { index: Index; id: Id; topics: Topics } = {
      index: {
        all: {
          articles: data.articles
            .map((article) => ({
              articleId: article.articleId,
              published: article.published,
              releaseDate: article.releaseDate,
              title: article.title,
              emoji: article.emoji,
              type: article.typeIcon.displayName,
              topics: article.topicIcons.map((icon) => icon.displayName),
            }))
            .slice(0, 8),
          length: data.length,
        },
        topTopics: {
          topics: topics.map((topic) => topic.displayName),
          icons: topics.map((topic) => topic.icon),
          articles: topics.map((topic) =>
            topic.allArticles.map((article) => ({
              articleId: article.articleId,
              published: article.published,
              releaseDate: article.releaseDate,
              title: article.title,
              emoji: article.emoji,
              type: article.type,
              topics: article.topicIcons.map((_topic) => _topic.displayName),
            })),
          ),
        },
      },
      id: {
        paths: data.articles.map((obj) => ({ params: { id: [obj.articleId] } })),
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
      },
      topics: {
        all: topics
          .filter((obj) => obj.allArticles.length > 0)
          .map((obj) => ({
            name: obj.displayName,
            icon: obj.icon,
            articles: obj.allArticles.map((obj) => ({
              articleId: obj.articleId,
              published: obj.published,
              releaseDate: obj.releaseDate,
              title: obj.title,
              emoji: obj.emoji,
              type: obj.type,
              topics: obj.topicIcons.map((obj) => obj.displayName),
            })),
          })),
      },
    };
    return shapedData;
  } else {
    throw new Error(`error message`);
  }
}

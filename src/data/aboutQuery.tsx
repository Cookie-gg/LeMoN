import { client } from 'pages/_app';
import { section } from 'utils/common';
import { ApolloError } from '@apollo/client';
import { AboutDocument, AboutQuery } from 'types/graphql.d';

export interface DataType {
  profile: {
    title: string;
    introduction: string;
    featuredImage: string;
    info: { text: string; icon: string }[];
  };
  tools: {
    title: string;
    slide: {
      title: string;
      explain: string;
      icon: string;
      bg: string;
    }[];
  };
  langs: {
    title: string;
    slide: { text: string; icon: string }[];
  };
}

export default async function aboutQuery(): Promise<{
  data: DataType | undefined;
  error: ApolloError | undefined;
}> {
  const { error, data } = await client.query<AboutQuery>({ query: AboutDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const sentences = section<string[]>(data.sentences);

    const shapedData: DataType = {
      profile: {
        title: titles.profile,
        introduction: sentences.profile[0],
        featuredImage: data.featuredImage.data,
        info: data.info.list.map((obj) => ({
          text: obj.title,
          icon: obj.icon,
        })),
      },
      tools: {
        title: titles.tools,
        slide: data.tools.list.map((obj) => ({
          title: obj.title,
          explain: (obj.texts as string[])[0],
          icon: obj.icon,
          bg: obj.background as string,
        })),
      },
      langs: {
        title: titles.langs,
        slide: data.langs.list.map((obj) => ({
          text: obj.title,
          icon: obj.icon,
        })),
      },
    };

    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

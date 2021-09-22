import { list, section } from 'utils/common';
import { client } from 'graphql/config.gql';
import { ApolloError } from '@apollo/client';
import { AboutDocument, AboutQuery } from 'types/graphql.d';
import axios from 'axios';

export interface DataType {
  ogImage?: string;
  profile: {
    title: string;
    introduction: string;
    feelingProud: string;
    info: { text: string; icon: string }[];
  };
  skills: {
    icon: string;
    title: string;
    explanation: string;
    contents: {
      title: string;
      list: string[];
    }[];
  }[];
}

export default async function aboutQuery(): Promise<{
  data: DataType | undefined;
  error: ApolloError | undefined;
}> {
  const { error, data } = await client.query<AboutQuery>({ query: AboutDocument });
  const ogImage = await axios.get<string>(`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/About`);

  if (data) {
    const titles = section<string>(data.titles);
    const sentences = section<string[]>(data.sentences);
    const front = list(data.front);
    const back = list(data.back);
    const others = list(data.others);

    const shapedData: DataType = {
      ogImage: ogImage ? ogImage.data : undefined,
      profile: {
        title: titles.profile.text,
        introduction: sentences.profile.text[0],
        feelingProud: data.feelingProud.data,
        info: data.info.list.map((obj) => ({
          text: obj.title,
          icon: obj.icon as string,
        })),
      },
      skills: [
        {
          icon: titles.front.icon as string,
          title: titles.front.text,
          explanation: sentences.front.text[0],
          contents: [
            {
              title: titles.dev.text,
              list: front.tools,
            },
            {
              title: titles.langs.text,
              list: front.langs,
            },
          ],
        },
        {
          icon: titles.back.icon as string,
          title: titles.back.text,
          explanation: sentences.back.text[0],
          contents: [
            {
              title: titles.dev.text,
              list: back.tools,
            },
            {
              title: titles.langs.text,
              list: back.langs,
            },
          ],
        },
        {
          icon: titles.others.icon as string,
          title: titles.others.text,
          explanation: sentences.others.text[0],
          contents: [
            {
              title: titles.dev.text,
              list: others.tools,
            },
          ],
        },
      ],
    };

    return { data: shapedData, error };
  } else {
    return { data: undefined, error };
  }
}

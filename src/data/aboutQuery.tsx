import { list, section } from 'utils/common';
import { client } from 'graphql/query/config.gql';
import { AboutDocument, AboutQuery } from 'types/graphql.d';

export interface AboutQueryType {
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

export default async function aboutQuery(): Promise<AboutQueryType> {
  const { error, data } = await client.query<AboutQuery>({ query: AboutDocument });
  if (data) {
    const titles = section<string>(data.titles);
    const sentences = section<string[]>(data.sentences);
    const front = list(data.front);
    const back = list(data.back);
    const others = list(data.others);

    const shapedData: AboutQueryType = {
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
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

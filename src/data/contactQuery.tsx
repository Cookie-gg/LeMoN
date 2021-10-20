import { section } from 'utils/common';
import { client } from 'graphql/config.gql';
import { ContactDocument, ContactQuery } from 'types/graphql.d';

export interface ContactQueryType {
  form: {
    title: string;
    addressDelivery: string;
  };
}

export default async function contactQuery(): Promise<ContactQueryType> {
  const { data, error } = await client.query<ContactQuery>({ query: ContactDocument });
  if (data) {
    const titles = section(data.titles);
    const shapedData: ContactQueryType = {
      form: {
        title: titles.form.text,
        addressDelivery: data.adressDelivery.data,
      },
    };
    return shapedData;
  } else {
    throw new Error(`error message: ${error}`);
  }
}

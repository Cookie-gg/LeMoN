import { section } from 'utils/common';
import { client } from 'graphql/config.gql';
import { ApolloError } from '@apollo/client';
import { ContactDocument, ContactQuery } from 'types/graphql.d';

export interface DataType {
  form: {
    title: string;
    addressDelivery: string;
  };
}

export default async function contactQuery(): Promise<{ data: DataType | undefined; error: ApolloError | undefined }> {
  const { data, error } = await client.query<ContactQuery>({ query: ContactDocument });
  if (data) {
    const titles = section(data.titles);
    const shapedData: DataType = {
      form: {
        title: titles.form.text,
        addressDelivery: data.adressDelivery.data,
      },
    };
    return { data: shapedData, error: undefined };
  } else {
    return { data: undefined, error };
  }
}

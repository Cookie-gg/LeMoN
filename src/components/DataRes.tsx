import { ApolloError } from '@apollo/client';

export default function DataRes({ loading, error }: { loading?: boolean; error?: ApolloError | string }) {
  if (typeof error === 'string') {
    error = JSON.parse(error);
  }
  return (
    <>
      {loading && <p>loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}

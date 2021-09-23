import { ApolloError } from '@apollo/client';
import { memo } from 'react';

function DataRes({ loading, error }: { loading?: boolean; error?: ApolloError | string }) {
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

export default memo(DataRes);

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://lemon-backend.an.r.appspot.com/graphql',
  cache: new InMemoryCache(),
});

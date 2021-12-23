import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';

const httpsLink = new HttpLink({ uri: `${process.env.NEXT_PUBLIC_MELON}/graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: process.env.NEXT_PUBLIC_GRAPHQL_KEY,
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpsLink),
  cache: new InMemoryCache(),
});

import 'assets/scss/foundation/reset.scss';
import 'assets/scss/foundation/base.scss';
import 'assets/scss/foundation/global.scss';
import type { AppProps } from 'next/app';
import { Head } from 'utils/next';
import { PageTransition, Header, Frame } from 'components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="description" content="Cookie's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTransition />
      <Header />
      <Frame>
        <Component {...pageProps} />
      </Frame>
    </ApolloProvider>
  );
}
export default MyApp;

import 'assets/scss/foundation/reset.scss';
import 'assets/scss/foundation/base.scss';
import type { AppProps } from 'next/app';
import { Head } from 'utils/next';
import { PageTransition, Header } from 'components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useCheck } from 'hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useCheck();
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="description" content="Cookie's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTransition />
      <Header />
      <main className={`${isMounted && 'mounted'}`}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
export default MyApp;

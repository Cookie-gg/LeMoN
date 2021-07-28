import 'assets/scss/foundation/reset.scss';
import 'assets/scss/foundation/base.scss';
import 'assets/scss/foundation/global.scss';
import type { AppProps } from 'next/app';
import { Head } from 'utils/next';
import { Header, MainFrame } from 'components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useMount } from 'hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useMount();
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="description" content="Cookie's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header isMounted={isMounted} />
      <MainFrame isMounted={isMounted}>
        <Component {...pageProps} />
      </MainFrame>
    </ApolloProvider>
  );
}
export default MyApp;

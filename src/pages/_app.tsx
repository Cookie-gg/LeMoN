import 'utils/prototype';
import { Head } from 'utils/next';
import 'slick-carousel/slick/slick.css';
import type { AppProps } from 'next/app';
import 'assets/scss/foundation/base.scss';
import 'assets/scss/foundation/reset.scss';
import 'assets/scss/foundation/global.scss';
import { Header, MainFrame } from 'components';
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    </ApolloProvider>
  );
}
export default MyApp;

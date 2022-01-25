import 'utils/prototype';
import { useAuth } from 'hooks';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';
import { client } from 'graphql/config.gql';
import { ApolloProvider } from '@apollo/client';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();

  return (
    <>
      <ProgressBar />
      <Header />
      <ApolloProvider {...{ client }}>
        <MainFrame auth={{ state, logout }}>
          <Component {...pageProps} auth={{ state, login }} />
        </MainFrame>
      </ApolloProvider>
    </>
  );
}

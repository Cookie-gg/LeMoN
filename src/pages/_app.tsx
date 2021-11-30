import 'utils/prototype';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';
import { useAuth } from 'hooks';
import { client } from 'graphql/config.gql';
import { ApolloProvider } from '@apollo/client';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login] = useAuth();
  return (
    <>
      <ProgressBar />
      <Header />
      <ApolloProvider {...{ client }}>
        <MainFrame>
          <Component {...pageProps} auth={{ state, login }} />
        </MainFrame>
      </ApolloProvider>
    </>
  );
}

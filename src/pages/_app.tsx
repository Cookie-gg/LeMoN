import 'utils/prototype';
import parse from 'html-react-parser';
import { useAuth, usePageView } from 'hooks';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { client } from 'graphql/config.gql';
import { Script } from 'utils/libs/next';
import { ApolloProvider } from '@apollo/client';
import { existsGaId, GA_ID } from 'utils/libs/gtag';
import { Header, MainFrame, ProgressBar } from 'components';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();
  usePageView();
  return (
    <>
      {/* Google Analytics */}
      {existsGaId && (
        <>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script strategy="afterInteractive">
            {parse(`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`)}
          </Script>
        </>
      )}
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

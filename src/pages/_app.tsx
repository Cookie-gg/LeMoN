import 'utils/prototype';
// import parse from 'html-react-parser';
import { useAuth, usePageView } from 'hooks';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { client } from 'graphql/config.gql';
import { Head, Script, useRouter } from 'utils/libs/next';
import { ApolloProvider } from '@apollo/client';
// import { existsGaId, GA_ID } from 'utils/libs/gtag';
import { Header, MainFrame, ProgressBar, Notification } from 'components';
import { createContext, useState } from 'react';

export const NotiContext = createContext<((arg: string) => void) | null>(null);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();
  const [noti, _noti] = useState<{ msg: string; enable: boolean }>({ msg: '', enable: false });
  const { pathname } = useRouter();
  // usePageView();
  return (
    <>
      <Head>
        {pathname.match(/blog\/\[\.{3}id\]|edit\/\[\.{3}id\]/g) && (
          <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css" />
          </>
        )}
        {/* Google Analytics */}
        {/* {existsGaId && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script strategy="afterInteractive">
              {parse(`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`)}
            </Script>
          </>
        )} */}
      </Head>
      <ProgressBar />
      <Header />
      <ApolloProvider {...{ client }}>
        <NotiContext.Provider value={(msg: string) => _noti({ msg, enable: true })}>
          <MainFrame auth={{ state, logout }}>
            <Component {...pageProps} auth={{ state, login }} />
          </MainFrame>
        </NotiContext.Provider>
      </ApolloProvider>
      <Notification noti={noti} dispatch={(state) => _noti({ msg: '', enable: state })} />
    </>
  );
}

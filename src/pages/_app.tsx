import 'utils/prototype';
import type { AppProps } from 'next/app';
import { dynamic } from 'utils/libs/next';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import { client } from 'graphql/config.gql';
import { useAuth, usePageView } from 'hooks';
import 'assets/scss/foundations/global.scss';
import { ApolloProvider } from '@apollo/client';
import { createContext, useState } from 'react';
import { ProgressBar, Notification } from 'components';
const Header = dynamic(() => import('components/Header'));
const MainFrame = dynamic(() => import('components/MainFrame'));

export const NotiContext = createContext<((arg: string) => void) | null>(null);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();
  const [noti, _noti] = useState<{ msg: string; enable: boolean }>({ msg: '', enable: false });
  usePageView();
  return (
    <>
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

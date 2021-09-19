import 'utils/prototype';
import { Head } from 'utils/next';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [headerState, _headerState] = useState<'close' | 'open' | 'expand'>('close');
  return (
    <>
      <Head>
        <meta name="description" content="Cookie's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0 user-noscalable=no" />
      </Head>
      <ProgressBar />
      <Header headerState={headerState} _headerState={_headerState} />
      <MainFrame headerState={headerState}>
        <Component {...pageProps} />
      </MainFrame>
    </>
  );
}

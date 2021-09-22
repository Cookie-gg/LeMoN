import 'utils/prototype';
import { useRouter } from 'utils/next';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { useEffect, useState } from 'react';
import { Header, MainFrame, ProgressBar } from 'components';

export default function MyApp({ Component, pageProps }: AppProps) {
  const asPath = useRouter().asPath;
  const [isMounted, _isMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => _isMounted(true), 0);
    return () => _isMounted(false);
  }, [asPath]);
  return (
    <>
      <ProgressBar isMounted={isMounted} />
      <Header />
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    </>
  );
}

import 'utils/prototype';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar />
      <Header />
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    </>
  );
}

import 'utils/prototype';
import { dynamic } from 'utils/next';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { MainFrame, ProgressBar } from 'components';

const Header = dynamic(() => import('components/Header'));

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

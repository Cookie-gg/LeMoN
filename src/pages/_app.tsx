import 'utils/prototype';
import { useAuth } from 'hooks';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();
  return (
    <>
      <ProgressBar />
      <Header />
      <MainFrame auth={{ state, logout }}>
        <Component {...pageProps} auth={{ state, login }} />
      </MainFrame>
    </>
  );
}

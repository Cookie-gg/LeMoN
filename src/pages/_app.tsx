import 'utils/prototype';
import axios from 'axios';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { useCallback, useEffect, useState } from 'react';
import { Header, MainFrame, ProgressBar } from 'components';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [authState, _authState] = useState(false);
  const refreshAuthState = useCallback(() => {
    const expiresin = 50 * 60 * 1000;
    setTimeout(() => {
      setInterval(() => {
        axios
          .get(`${process.env.NEXT_PUBLIC_AUTH}/refresh`, {
            headers: {
              key: process.env.NEXT_PUBLIC_AUTH_KEY,
              authorization: `bearer ${sessionStorage.getItem('access_token')}`,
            },
          })
          .then((res) => sessionStorage.setItem('access_token', res.data.token))
          .catch(() => {
            _authState(false);
            sessionStorage.removeItem('access_token');
          });
      }, expiresin);
    }, expiresin);
  }, []);
  useEffect(() => {
    sessionStorage.getItem('access_token') &&
      axios
        .get(`${process.env.NEXT_PUBLIC_AUTH}/status`, {
          headers: {
            key: process.env.NEXT_PUBLIC_AUTH_KEY,
            authorization: `bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
        .then(() => {
          _authState(true);
          refreshAuthState();
        })
        .catch(() => {
          _authState(false);
          sessionStorage.removeItem('access_token');
        });
  }, [refreshAuthState]);
  return (
    <>
      <ProgressBar />
      <Header />
      <MainFrame>
        <Component
          {...pageProps}
          auth={{ state: authState, set: (args: boolean) => _authState(args), refresh: () => refreshAuthState() }}
        />
      </MainFrame>
    </>
  );
}

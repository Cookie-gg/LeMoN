import 'utils/prototype';
import type { AppProps } from 'next/app';
import 'assets/scss/foundations/base.scss';
import 'assets/scss/foundations/reset.scss';
import 'assets/scss/foundations/global.scss';
import { Header, MainFrame, ProgressBar } from 'components';
import { Script, useRouter } from 'utils/next';
import { useAuth } from 'hooks';
import { client } from 'graphql/config.gql';
import { ApolloProvider } from '@apollo/client';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, login, logout] = useAuth();
  const { asPath } = useRouter();

  return (
    <>
      {asPath.match(/blog|edit/g) && (
        <>
          <Script
            id="twitter snipets"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: /* javascript */ `
                window.twttr = (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                  if (d.getElementById(id)) return t;
                  js = d.createElement(s);
                  js.id = id;
                  js.src = "https://platform.twitter.com/widgets.js";
                  fjs.parentNode.insertBefore(js, fjs);
                  t._e = [];
                  t.ready = (f) => t._e.push(f);
                  return t;
                }(document, "script", "twitter-wjs"));`,
            }}
          />
          <Script strategy="afterInteractive" async src="https://www.youtube.com/player_api" />
          <Script strategy="afterInteractive" async src="https://static.codepen.io/assets/embed/ei.js" />
          <Script strategy="afterInteractive" src="https://speakerdeck.com/assets/embed.js" />
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

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { existsGaId, GA_ID } from 'utils/libs/gtag';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          {/* font-family */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap"
          />
          {/* katex */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css" />
          {/* icon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          {/* icon/apple */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="myapp" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#ffd500" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
          {/* icon/android */}
          <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
          <meta name="msapplication-TileColor" content="#ffd500" />
          {/* meta */}
          <meta name="theme-color" content="#ffd500" />
          <meta name="application-name" content="LeMoN" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="lemon:image" content="/site-icon.png" />
          {/* meta/ogp */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="LeMoN" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {/* meta/twitter */}
          <meta name="twitter:title" content="LeMoN" />
          <meta name="twitter:creator" content="@cookie_ggs" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://twitter.com/cookie_ggs/" />
          {/* Google Analytics */}
          {existsGaId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: /*javascript*/ `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

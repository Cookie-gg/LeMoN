export default function PWA() {
  return (
    <>
      <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
      <meta name="msapplication-TileColor" content="#ffd500" />
      {/* safari */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="myapp" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#ffd500" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
      {/* 一般 */}
      <meta name="theme-color" content="#ffd500" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="myapp" />
    </>
  );
}

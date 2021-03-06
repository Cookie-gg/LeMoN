import { memo } from 'react';
import { Script } from 'utils/libs/next';

function Scripts() {
  return (
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
  );
}

export default memo(Scripts);

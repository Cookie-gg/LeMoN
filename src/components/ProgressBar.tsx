import Nprogress from 'nprogress';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

export default function ProgressBar() {
  const router = useRouter();
  const [isMounted, _isMounted] = useState(false);
  Nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });
  const dependencies = router.asPath.split('?')[0];
  useEffect(() => {
    Router.events.on('routeChangeStart', () => Nprogress.start());
    Router.events.on('routeChangeComplete', () => Nprogress.done());
    Router.events.on('routeChangeError', () => Nprogress.done());
    setTimeout(() => _isMounted(true), 0);
    return () => {
      _isMounted(false);
      Router.events.off('routeChangeStart', () => Nprogress.start());
      Router.events.off('routeChangeComplete', () => Nprogress.done());
      Router.events.off('routeChangeError', () => Nprogress.done());
    };
  }, [dependencies]);

  return <noscript className={`${isMounted ? 'mounted' : 'yet'}`}></noscript>;
}

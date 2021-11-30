import Nprogress from 'nprogress';
import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

Nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });
export default function ProgressBar() {
  Router.events.on('routeChangeStart', () => {
    Nprogress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    Nprogress.done();
  });

  Router.events.on('routeChangeError', () => {
    Nprogress.done();
  });

  const router = useRouter();
  const dependencies = router.pathname === '/blog/[...id]' ? router.query.id : router.asPath;
  const [isMounted, _isMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => _isMounted(true), 0);
    return () => _isMounted(false);
  }, [dependencies]);

  return <noscript className={`${isMounted ? 'mounted' : 'yet'}`}></noscript>;
}

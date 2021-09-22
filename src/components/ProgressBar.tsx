import { Router } from 'next/router';
import Nprogress from 'nprogress';

Nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });
export default function ProgressBar({ isMounted }: { isMounted: boolean }) {
  Router.events.on('routeChangeStart', () => {
    Nprogress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    Nprogress.done();
  });

  Router.events.on('routeChangeError', () => {
    Nprogress.done();
  });
  return <span className={`${isMounted && 'mounted'}`}></span>;
}

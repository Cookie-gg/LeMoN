import nprogress from 'nprogress';
import { useEffect } from 'react';

nprogress.configure({ showSpinner: false, speed: 500, minimum: 0.25 });
export default function ProgressBar() {
  if (process.browser) {
    nprogress.start();
  }
  useEffect(() => {
    nprogress.done();
  });
  return <></>;
}

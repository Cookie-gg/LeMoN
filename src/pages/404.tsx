import { Button } from 'components';
import { Link } from 'utils/next';
import pages from '../assets/scss/pages/404.module.scss';
function Error() {
  return (
    <>
      <h1 className={pages.title}>404</h1>
      <p className={pages.caution}>お探しのページは見つかりませんでした。</p>
      <Button className={pages.button}>
        <Link href="/">
          <a>ホームへ戻る</a>
        </Link>
      </Button>
    </>
  );
}

export default Error;

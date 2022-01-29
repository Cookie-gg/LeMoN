import { Link } from 'utils/libs/next';
import { Button, HeadMeta } from 'components';
import styles from '../assets/scss/pages/404.module.scss';

function Page() {
  return (
    <>
      <HeadMeta title="404" />
      <div className={styles.entire}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.caution}>お探しのページは見つかりませんでした。</p>
        <Button className={styles.button}>
          <Link href="/">
            <a>ホームへ戻る</a>
          </Link>
        </Button>
      </div>
    </>
  );
}

export default Page;

import { Button, HeadMeta } from 'components';
import { Link } from 'utils/next';
import styles from '../assets/scss/pages/404.module.scss';
import error from 'assets/json/404.json';
function Page() {
  return (
    <>
      <HeadMeta title={error.title} ogImage={`${process.env.OG_IMAGE}/page/${error.title}`} />
      <h1 className={styles.title}>{error.title}</h1>
      <p className={styles.caution}>{error.messgae}</p>
      <Button className={styles.button}>
        <Link href="/">
          <a>ホームへ戻る</a>
        </Link>
      </Button>
    </>
  );
}

export default Page;

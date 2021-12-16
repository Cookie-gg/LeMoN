import { memo } from 'react';
import styles from '../assets/scss/components/AuthButton.module.scss';
import { Icon as Iconify } from '@iconify/react';
import { Link, useRouter } from 'utils/next';

function AuthButton(auth: { state: boolean; logout: () => Promise<void> }) {
  const path = useRouter().asPath;
  return (
    <div className={styles.entire}>
      <a className={styles.log} title="ログアウト" onClick={async () => auth.logout()}>
        <Iconify icon="ic:round-logout" />
      </a>
      <Link href="/edit">
        <a title="記事一覧">
          <button />
        </a>
      </Link>
      <Link href="/edit/no-title">
        <a className={`${styles.article} ${path.split('/')[2] === 'no-title' && styles.active}`} title="記事新規作成">
          <Iconify icon="ic:round-mode-edit-outline" />
        </a>
      </Link>
    </div>
  );
}

export default memo(AuthButton);

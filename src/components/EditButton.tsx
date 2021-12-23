import { memo } from 'react';
import { Link } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/EditButton.module.scss';

function EditButton({ articleId }: { articleId: string }) {
  return (
    <div className={styles.entire}>
      <Link href={`/edit/${articleId}`}>
        <a>
          <button className={styles.editor}>
            <Iconify fr={''} icon="ic:round-edit-note" />
          </button>
        </a>
      </Link>
      <Link href={`https://github.com/Cookie-gg/zenn-content/blob/master/articles/${articleId}.md`}>
        <a target="_blank">
          <button className={styles.github}>
            <Iconify fr={''} icon="ic:round-open-in-new" />
            Open in GitHub
          </button>
        </a>
      </Link>
    </div>
  );
}

export default memo(EditButton);

import { memo } from 'react';
import { Link } from 'utils/libs/next';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/EditButton.module.scss';
import Nlink from './Nlink';

function EditButton({ articleId, className }: { articleId: string; className?: string }) {
  return (
    <div className={`${styles.entire} ${className}`}>
      <Nlink href="/edit/[...id]" as={`/edit/${articleId}`}>
        <button className={styles.editor}>
          <Iconify fr={''} icon="ic:round-edit-note" />
        </button>
      </Nlink>
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

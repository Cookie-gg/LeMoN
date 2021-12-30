import { Icon as Iconify } from '@iconify/react';
import { memo } from 'react';
import styles from '../assets/scss/components/Loading.module.scss';

function Loading() {
  return <Iconify fr={''} icon="eos-icons:loading" className={styles.entire} />;
}

export default memo(Loading);

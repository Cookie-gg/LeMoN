import { useMount } from 'hooks';
import styles from '../assets/scss/components/LeMoN.module.scss';

export default function LeMoN() {
  const isMount = useMount();
  return (
    <h1 className={`${styles.entire} ${isMount && styles.mounted} exclude`}>
      <span className={styles.text_wrapper}>
        <span className={styles.text}>LeMoN</span>
      </span>
    </h1>
  );
}

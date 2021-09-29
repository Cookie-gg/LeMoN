import styles from '../assets/scss/components/LeMoN.module.scss';

export default function LeMoN() {
  return (
    <h1 className={`${styles.entire} exclude`}>
      <span className={styles.text_wrapper}>
        <span className={styles.text}>LeMoN</span>
      </span>
    </h1>
  );
}

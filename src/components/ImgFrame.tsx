import styles from '../assets/scss/components/ImgFrame.module.scss';

export default function ImgFrame({ url }: { url: any }) {
  return (
    <div className={styles.image_wrapper}>
      <div className={styles.image}></div>
    </div>
  );
}

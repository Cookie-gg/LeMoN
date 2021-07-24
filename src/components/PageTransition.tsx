import { useRouter } from 'utils/next';
import styles from '../assets/scss/components/PageTransition.module.scss';

export default function PageTransition() {
  const router = useRouter();
  return (
    <>
      <div
        className={`
        ${styles.entire} 
        ${router.pathname == '/' && styles.home}`}
      >
        <div className={styles.cover}>
          <span>LeMoN</span>
        </div>
      </div>
    </>
  );
}

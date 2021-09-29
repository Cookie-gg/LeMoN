import { specifor } from 'utils/common';
import styles from '../assets/scss/components/PhraseTypo.module.scss';

export default function PhraseTypo() {
  return (
    <div className={`${styles.entire} exclude`}>
      {specifor(10, (i: number) => (
        <div key={i}>
          <span className="pc">WEB DEVELOP</span>
          <span className="sp">WEB DEV</span>
        </div>
      ))}
    </div>
  );
}

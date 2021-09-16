import { Cookie_gg } from 'svg';
import styles from '../assets/scss/components/NamePlate.module.scss';

interface PropsType {
  className?: string;
}

export default function NamePlate({ className }: PropsType) {
  return (
    <h2 className={`${className} ${styles.entire}`}>
      <span>
        <Cookie_gg />
        <Cookie_gg />
      </span>
    </h2>
  );
}

import { memo } from 'react';
import { Cookie_gg } from 'svg';
import { compare } from 'utils/common';
import styles from '../assets/scss/components/NamePlate.module.scss';

interface PropsType {
  className?: string;
}

function NamePlate({ className }: PropsType) {
  return (
    <h2 className={`${className} ${styles.entire}`}>
      <span className={styles.svg}>
        <Cookie_gg />
        <Cookie_gg />
      </span>
    </h2>
  );
}

export default memo(NamePlate, (prev: PropsType, next: PropsType) => compare<PropsType>(prev, next));

import { compare } from 'utils/common';
import { ChangeEvent, memo } from 'react';
import styles from '../assets/scss/components/Selection.module.scss';

interface PropsType {
  data: string[];
  dispatch: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Selection({ data, dispatch }: PropsType) {
  return (
    <select className={styles.topics} onChange={dispatch} defaultValue={data[0]}>
      {data.map((el: string, i: number) => (
        <option key={i} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}

export default memo(Selection, (prev: PropsType, next: PropsType) => compare(prev, next));

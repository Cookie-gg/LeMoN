import { memo } from 'react';
import styles from '../assets/scss/components/FormLabel.module.scss';

function FormLabel({ htmlFor, required, text }: { htmlFor: string; required?: boolean; text: string }) {
  return (
    <label htmlFor={htmlFor} className={`${styles.entire} ${required && styles.required}`}>
      {text}
    </label>
  );
}

export default memo(FormLabel);

import { memo, MouseEvent } from 'react';
import styles from '../assets/scss/components/FormSubmit.module.scss';

function FormSubmit({
  value,
  preventSubmit,
  onClick,
  className,
}: {
  value: string;
  preventSubmit?: boolean;
  onClick?: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  className?: string;
}) {
  return (
    <input
      type={preventSubmit ? 'button' : 'submit'}
      value={value}
      className={`${styles.entire} ${className}`}
      onClick={(e) => onClick && onClick(e)}
    />
  );
}
export default memo(FormSubmit);

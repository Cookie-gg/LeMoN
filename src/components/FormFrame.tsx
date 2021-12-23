import { FormEvent, memo, ReactElement } from 'react';
import styles from '../assets/scss/components/FormFrame.module.scss';

function FormFrame({
  className,
  children,
  onSubmit,
}: {
  className?: string;
  children: ReactElement[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form method="post" className={`${styles.entire} ${className}`} onSubmit={async (e) => onSubmit(e)}>
      {children.map((child) => child)}
    </form>
  );
}
export default memo(FormFrame);

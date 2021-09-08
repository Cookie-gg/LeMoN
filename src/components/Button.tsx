import React, { ReactElement } from 'react';
import styles from '../assets/scss/components/Button.module.scss';

interface PropsType {
  children: ReactElement | ReactElement[];
  className: string;
  isInteractive?: boolean;
  switching?: boolean;
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ children, className, isInteractive = false, switching, clickEvent }: PropsType) {
  
  return (
    <div className={`${styles.entire} ${className}`}>
      {isInteractive ? (
        <button
          onClick={(e) => {
            clickEvent && clickEvent(e);
          }}
        >
          {switching ? (children as ReactElement[])[0] : (children as ReactElement[])[1]}
        </button>
      ) : (
        <button>{children}</button>
      )}
    </div>
  );
}

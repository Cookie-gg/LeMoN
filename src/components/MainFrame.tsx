import { memo, ReactElement } from 'react';
import PageTransition from './PageTransition';
import styles from '../assets/scss/components/MainFrame.module.scss';

function MainFrame({ children }: { children: ReactElement }) {
  console.log("main");
  return (
    <>
      <main className={`${styles.main}`}>
        <PageTransition />
        {children}
      </main>
    </>
  );
}
export default memo(MainFrame);

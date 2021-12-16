import { useAgent } from 'hooks';
import { useRouter } from 'utils/next';
import { AuthButton } from 'components';
import PageTransition from './PageTransition';
import { ReactElement, useEffect, useState } from 'react';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({
  auth,
  children,
}: {
  auth: { state: boolean; logout: () => Promise<void> };
  children: ReactElement;
}) {
  const isMobile = useAgent('mobile');
  const pathname = useRouter().pathname;
  const [windowHeight, _windowHeight] = useState(0);
  useEffect(() => {
    if (isMobile) _windowHeight(window.innerHeight);
  }, [isMobile]);
  return (
    <main
      className={`${styles.entire} ${pathname === '/' && styles.home}`}
      style={{ height: isMobile ? `${windowHeight}px` : undefined }}
    >
      {pathname !== '/' && auth.state && <AuthButton {...auth} />}
      <PageTransition />
      {children}
    </main>
  );
}

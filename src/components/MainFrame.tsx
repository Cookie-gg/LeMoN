import { ReactElement } from 'react';
import { useRouter } from 'utils/next';
import { AuthButton } from 'components';
import PageTransition from './PageTransition';
import { useAgent, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/MainFrame.module.scss';

export default function MainFrame({
  auth,
  children,
}: {
  auth: { state: boolean; logout: () => Promise<void> };
  children: ReactElement;
}) {
  const isMobile = useAgent('mobile');
  const { pathname } = useRouter();
  const { height } = useWindowDimensions();
  return (
    <main
      className={`${styles.entire} ${pathname === '/' && styles.home}`}
      style={{ height: isMobile && height ? `${height}px` : undefined }}
    >
      {pathname !== '/' && auth.state && <AuthButton logout={() => auth.logout()} />}
      <PageTransition />
      {children}
    </main>
  );
}

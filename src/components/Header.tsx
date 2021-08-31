import { useState } from 'react';
import { Nlink } from 'components';
import { useRouter } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import { useAgent, useFirstMount, usePeriod } from 'hooks';
import styles from '../assets/scss/components/Header.module.scss';

const data = [
  { name: 'Home', path: '/', icon: 'fa-solid:home' },
  { name: 'About', path: '/about', icon: 'fa-solid:user' },
  { name: 'Works', path: '/works', icon: 'fa-solid:code' },
  { name: 'Blog', path: '/blog', icon: 'fa-solid:newspaper' },
  { name: 'Contact', path: '/contact', icon: 'fa-solid:envelope' },
];

export default function Header() {
  const isMobile = useAgent();
  const isMounted = useFirstMount();
  const router = useRouter();
  const [isClicked, _isClicked] = useState<boolean>(false);
  const [closing, _closing] = usePeriod(false);
  function clickEvent() {
    _closing(!isMobile ? 950 : 1250);
    _isClicked((prev) => !prev);
  }
  const list = data.map((el: { name: string; path: string; icon: string }, i: number) => (
    <li
      key={i}
      className={`${router.pathname === el.path && styles.active} ${
        router.pathname.includes(`${el.path}/`) && styles.lower_active
      }`}
      onClick={() => {
        if (isMobile) clickEvent();
      }}
    >
      <Nlink href={el.path}>
        <>
          <Iconify className="sp" icon={el.icon} />
          <span>{el.name}</span>
        </>
      </Nlink>
    </li>
  ));
  return (
    <header
      className={`${styles.entire} ${isMounted && styles.mounted} ${closing && styles.closing} ${
        isClicked && styles.opened
      }`}
    >
      <button className={`${isClicked && styles.opened} ${closing && styles.closing}`} onClick={() => clickEvent()}>
        <span></span>
      </button>
      <ul className={`${isClicked ? styles.opened : styles.closed}`}>
        {isMobile ? <span className={styles.sp_wrapper}>{list}</span> : list}
      </ul>
    </header>
  );
}

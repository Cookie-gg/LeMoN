import { useAgent, usePeriod } from 'hooks';
import { useState } from 'react';
import { Link, useRouter } from 'utils/next';
import styles from '../assets/scss/components/Header.module.scss';
import { Icon as Iconify } from '@iconify/react';

const data = [
  { name: 'Home', path: '/', icon: 'fa-solid:home' },
  { name: 'About', path: '/about', icon: 'fa-solid:user' },
  { name: 'Works', path: '/works', icon: 'fa-solid:code' },
  { name: 'Blog', path: '/blog', icon: 'fa-solid:newspaper' },
  { name: 'Contact', path: '/contact', icon: 'fa-solid:envelope' },
];

export default function Header({ isMounted }: { isMounted: boolean }) {
  const isMobile = useAgent();
  const router = useRouter();
  const [isClicked, _isClicked] = useState<boolean>(false);
  const [closing, _closing] = usePeriod(false);
  function clickEvent() {
    _closing(!isMobile ? 950 : 1250);
    _isClicked((prev) => !prev);
  }
  const list = data.map((el: {name: string, path: string, icon: string}, i: number) => (
    <li
      key={i}
      className={`${el.path === router.pathname && styles.active}`}
      onClick={() => {
        if (isMobile) clickEvent();
      }}
    >
      <Link href={el.path}>
        <a>
          <Iconify className="sp" icon={el.icon} />
          <span>{el.name}</span>
        </a>
      </Link>
    </li>
  ));
  return (
    <header
      className={`${styles.entire} ${isMounted && styles.mounted} ${closing && styles.closing} ${
        isClicked && styles.opened
      }`}
    >
      <button
        className={`${isClicked && styles.opened} ${closing && styles.closing}`}
        onClick={() => clickEvent()}
      >
        <span></span>
      </button>
      <ul className={`${isClicked ? styles.opened : styles.closed}`}>
        {isMobile ? <span className={styles.sp_wrapper}>{list}</span> : list}
      </ul>
    </header>
  );
}

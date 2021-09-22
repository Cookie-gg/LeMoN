import { usePeriod } from 'hooks';
import { memo, useState } from 'react';
import { Link, useRouter } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/Header.module.scss';

function Header() {
  const paths = [
    { name: 'Home', path: '/', icon: 'fa-solid:home' },
    { name: 'About', path: '/about', icon: 'fa-solid:user' },
    { name: 'Works', path: '/works', icon: 'fa-solid:code' },
    { name: 'Blog', path: '/blog', icon: 'fa-solid:newspaper' },
    { name: 'Contact', path: '/contact', icon: 'fa-solid:envelope' },
  ];
  const router = useRouter();
  const [isClosing, _isClosing] = usePeriod(false);
  const [headerState, _headerState] = useState<'close' | 'open' | 'expand'>('close');
  const stateClass = (openClass: string, expandClass: string) => {
    return `${(headerState === 'open' || headerState === 'expand') && openClass} ${
      headerState === 'expand' && expandClass
    }`;
  };
  return (
    <header
      className={`${styles.entire} ${stateClass('header_opened', 'header_expanded')}`}
    >
      <button
        className={` ${stateClass(styles.opened, styles.expanded)} ${isClosing && styles.closing}`}
        onClick={() => {
          if (window.innerWidth < 820) _isClosing(950);
          _headerState((prev) => (prev === 'open' || prev === 'expand' ? 'close' : 'open'));
        }}
      >
        <span className="pc"></span>
      </button>
      <ul className={`${stateClass(styles.opened, styles.expanded)}`}>
        {paths.map((el: { name: string; path: string; icon: string }, i: number) => (
          <li
            key={i}
            className={`${router.pathname === el.path && styles.active} ${
              router.pathname.includes(`${el.path}/`) && styles.lower_active
            }`}
            onClick={() => _headerState((prev) => (prev === 'open' || prev === 'expand' ? 'close' : 'open'))}
          >
            <Link href={el.path}>
              <a>
                <Iconify className="sp" icon={el.icon} />
                <span className={styles.name}>{el.name}</span>
              </a>
            </Link>
          </li>
        ))}
        <div
          className={`${styles.arrow} sp`}
          onClick={() => _headerState((prev) => (prev === 'expand' ? 'open' : 'expand'))}
        >
          &gt;&gt;
        </div>
      </ul>
    </header>
  );
}

export default memo(Header);

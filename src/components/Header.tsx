import { Link, useRouter } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import { useFirstMount, usePeriod, useWindowDimensions } from 'hooks';
import styles from '../assets/scss/components/Header.module.scss';
import { Dispatch, SetStateAction, useEffect } from 'react';

const data = [
  { name: 'Home', path: '/', icon: 'fa-solid:home' },
  { name: 'About', path: '/about', icon: 'fa-solid:user' },
  { name: 'Works', path: '/works', icon: 'fa-solid:code' },
  { name: 'Blog', path: '/blog', icon: 'fa-solid:newspaper' },
  { name: 'Contact', path: '/contact', icon: 'fa-solid:envelope' },
];

export default function Header({
  headerState,
  _headerState,
}: {
  headerState: 'close' | 'open' | 'expand';
  _headerState: Dispatch<SetStateAction<'close' | 'open' | 'expand'>>;
}) {
  const router = useRouter();
  const isMounted = useFirstMount();
  const [isClosing, _isClosing] = usePeriod(false);
  const window = useWindowDimensions() as { width: number; height: number };
  const clickEvent = () => {
    if (!(window.width < 820)) _isClosing(950);
    _headerState((prev) => (prev === 'open' || prev === 'expand' ? 'close' : 'open'));
  };
  return (
    <header className={`${styles.entire} ${isMounted && styles.mounted}`}>
      <button
        className={`${(headerState === 'open' || headerState === 'expand') && styles.opened} ${
          headerState === 'expand' && styles.expanded
        } ${!(window.width < 820) && isClosing && styles.closing}`}
        onClick={() => clickEvent()}
      >
        {!(window.width < 820) && <span></span>}
      </button>
      <ul
        className={`${(headerState === 'open' || headerState === 'expand') && styles.opened} ${
          headerState === 'expand' && styles.expanded
        }`}
      >
        {data.map((el: { name: string; path: string; icon: string }, i: number) => (
          <li
            key={i}
            className={`${router.pathname === el.path && styles.active} ${
              router.pathname.includes(`${el.path}/`) && styles.lower_active
            }`}
            onClick={() => window.width < 820 && clickEvent()}
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

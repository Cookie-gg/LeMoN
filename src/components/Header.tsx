import { usePeriod } from 'hooks';
import { Nlink } from 'components';
import { memo, useState } from 'react';
import { useRouter } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import { useSwipeable } from 'react-swipeable';
import styles from '../assets/scss/components/Header.module.scss';

function Header() {
  const paths = [
    { name: 'Home', path: '/', icon: 'fa-solid:home' },
    { name: 'About', path: '/about', icon: 'fa-solid:user' },
    { name: 'Works', path: '/works', icon: 'fa-solid:code' },
    { name: 'Blog', path: '/blog', icon: 'fa-solid:newspaper' },
    { name: 'Contact', path: '/contact', icon: 'fa-solid:envelope' },
  ];
  const pathname = useRouter().pathname;
  const [isClosing, _isClosing] = usePeriod(false);
  const [headerState, _headerState] = useState<'close' | 'open' | 'expand'>('close');
  const stateClass = (openClass: string, expandClass: string) => {
    return `${(headerState === 'open' || headerState === 'expand') && openClass} ${
      headerState === 'expand' && expandClass
    }`;
  };
  const swipeOptions = useSwipeable({
    onSwipedRight: () => _headerState((prev) => (prev === 'close' ? 'open' : 'expand')),
    onSwipedLeft: () => _headerState((prev) => (prev === 'expand' ? 'open' : 'close')),
  });
  return (
    <header
      className={`${styles.entire} ${pathname === '/' && styles.home} ${stateClass(
        'header_opened',
        'header_expanded',
      )}`}
    >
      <div
        {...swipeOptions}
        className={`${stateClass(styles.opened, styles.expanded)} ${styles.swiper}`}
        onClick={() => _headerState((prev) => (prev === 'open' || prev === 'expand' ? 'close' : prev))}
      />
      <button
        className={` ${stateClass(styles.opened, styles.expanded)} ${isClosing && styles.closing}`}
        onClick={() => {
          if (window.innerWidth > 820) _isClosing(true, 950);
          _headerState((prev) => (prev === 'open' || prev === 'expand' ? 'close' : 'open'));
        }}
      >
        <span className="pc"></span>
      </button>
      <ul className={`${stateClass(styles.opened, styles.expanded)}`}>
        {paths.map((el: { name: string; path: string; icon: string }, i: number) => (
          <li
            key={i}
            className={`${pathname === el.path && styles.active} ${
              pathname.includes(`${el.path}/`) && styles.lower_active
            }`}
            onClick={() => window.innerWidth < 820 && _headerState('close')}
          >
            <Nlink href={el.path}>
              <>
                <Iconify className="sp" icon={el.icon} />
                <span className={styles.name}>{el.name}</span>
              </>
            </Nlink>
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

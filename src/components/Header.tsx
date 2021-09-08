import { useState } from 'react';
import { Nlink } from 'components';
import { useRouter } from 'utils/next';
import { Icon as Iconify } from '@iconify/react';
import { useAgent, useFirstMount, usePeriod } from 'hooks';
import styles from '../assets/scss/components/Header.module.scss';
import { useHeaderQuery } from 'types/graphql.d';

export default function Header() {
  const router = useRouter();
  const isMobile = useAgent();
  const { data } = useHeaderQuery();
  const isMounted = useFirstMount();
  const [closing, _closing] = usePeriod(false);
  const [isClicked, _isClicked] = useState<boolean>(false);
  function clickEvent() {
    _closing(!isMobile ? 950 : 1250);
    _isClicked((prev) => !prev);
  }
  const list =
    data &&
    data.paths.sortObj<number>('order').map((el: { name: string; path: string; icon: string }, i: number) => (
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

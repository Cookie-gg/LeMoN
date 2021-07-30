import { useAgent, usePeriod } from 'hooks';
import { useState } from 'react';
import { Link, useRouter } from 'utils/next';
import styles from '../assets/scss/components/Header.module.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faHome,
  faUser,
  faNewspaper,
  faEnvelope,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const paths = [
  ['Home', '/', faHome],
  ['About', '/about', faUser],
  ['Works', '/works', faCode],
  ['Blog', '/blog', faNewspaper],
  ['Contact', '/contact', faEnvelope],
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
  const list = paths.map((path, i) => (
    <li
      key={i}
      className={`${path[1] === router.pathname && styles.active}`}
      onClick={() => {
        if (isMobile) clickEvent();
      }}
    >
      <Link href={path[1].toString()}>
        <a>
          <Icon className="sp" icon={path[2] as IconDefinition}></Icon>
          <span>{path[0]}</span>
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

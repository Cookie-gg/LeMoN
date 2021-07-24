import { useAgent, useMount } from 'hooks';
import { useState } from 'react';
import { setActiveTime } from 'utils/common';
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

export default function Header() {
  const isMounted = useMount();
  const isMobile = useAgent();
  const router = useRouter();
  const [isClicked, _isClicked] = useState<boolean>(false);
  const [closing, _closing] = useState<boolean>(false);
  return (
    <header className={`${styles.entire} ${isMounted && styles.mounted}`}>
      <button
        className={`${isClicked && styles.opened} ${closing && styles.closing}`}
        onClick={() => {
          _isClicked((prev) => !prev);
          setActiveTime(_closing, isMobile ? 950 : 1500);
        }}
      >
        <span></span>
      </button>
      <ul className={`${isClicked ? styles.opened : styles.closed}`}>
        {paths.map((path, i) => (
          <li
            key={i}
            className={`${path[1] === router.pathname && styles.active}`}
            onClick={() => {
              if (isMobile) {
                console.log("test");
                _isClicked((prev) => !prev);
                setActiveTime(_closing, isMobile ? 950 : 1500);
              }
            }}
          >
            <Link href={path[1].toString()}>
              <a>
                <Icon className="sp" icon={path[2] as IconDefinition}></Icon>
                <span>{path[0]}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

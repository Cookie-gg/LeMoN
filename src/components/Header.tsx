import { useCheck } from 'hooks';
import { useState } from 'react';
import { setActiveTime } from 'utils/common';
import { Link } from 'utils/next';
import styles from '../assets/scss/components/Header.module.scss';

const path = [
  ['Home', '/'],
  ['About', '/about'],
  ['Works', '/Works'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Header() {
  const isMounted = useCheck();
  const [isClicked, _isClicked] = useState<boolean>(false);
  const [closing, _closing] = useState<boolean>(false);
  function clickEvenvtHandler() {
    _isClicked((prev) => !prev);
    setActiveTime(_closing, 725);
  }
  return (
    <header className={`${styles.entire} ${isMounted && styles.mounted}`}>
      <button
        className={`${isClicked && styles.opened} ${closing && styles.closing}`}
        onClick={clickEvenvtHandler}
      >
        <span></span>
      </button>
      <ul className={`${isClicked ? styles.opened : styles.closed}`}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/works">
            <a>Works</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

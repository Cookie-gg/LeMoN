import styles from '../assets/scss/components/ProfileInfo.module.scss';
import { Icon as Iconify } from '@iconify/react';

interface PropsType {
  data: { text: string; icon: string }[];
  className: string;
}

export default function ProfileInfo({ data, className }: PropsType) {
  return (
    <ul className={`${styles.entire} ${className}`}>
      {data.map((el: { text: string; icon: string }, i: number) => {
        if ((el.text.includes('@') && el.text.includes('.com')) || el.text.includes('.co.jp')) {
          return (
            <li key={i}>
              <span>
                <a href={`mailto:${el.text}`}>
                  <Iconify fr={''} icon={el.icon} />
                  <p>{el.text}</p>
                </a>
              </span>
            </li>
          );
        } else {
          return (
            <li key={i}>
              <span>
                <Iconify fr={''} icon={el.icon} />
                <p>{el.text}</p>
              </span>
            </li>
          );
        }
      })}
    </ul>
  );
}

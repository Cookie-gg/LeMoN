import styles from '../assets/scss/components/ProfileInfo.module.scss';
import { Icon as Iconify } from '@iconify/react';
import { memo } from 'react';
import { compare } from 'utils/common';

interface PropsType {
  data: { icon: string; content: string }[];
  className: string;
}

function ProfileInfo({ data, className }: PropsType) {
  return (
    <ul className={`${styles.entire} ${className}`}>
      {data.map((el: { content: string; icon: string }, i: number) => {
        if (
          ((el.content as string).includes('@') && (el.content as string).includes('.com')) ||
          (el.content as string).includes('.co.jp')
        ) {
          return (
            <li key={i}>
              <span>
                <a href={`mailto:${el.content}`}>
                  <Iconify icon={el.icon} />
                  <p>{el.content}</p>
                </a>
              </span>
            </li>
          );
        } else {
          return (
            <li key={i}>
              <span>
                <Iconify icon={el.icon} />
                <p>{el.content}</p>
              </span>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default memo(ProfileInfo, (prev: PropsType, next: PropsType) => compare(prev, next));

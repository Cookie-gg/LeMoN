import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/List.module.scss';

export default function List({
  data,
  className,
}: {
  data: { content: string; icon: string }[];
  className: string;
}) {
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

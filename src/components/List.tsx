import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import styles from '../assets/scss/components/List.module.scss';

export default function List({
  list,
  icon,
  className,
}: {
  list: { content: string | number }[];
  icon?: IconDefinition[];
  className: string;
}) {
  return (
    <ul className={`${styles.entire} ${className}`}>
      {list.map((el: { content: string | number }, i: number) => {
        if (
          ((el.content as string).includes('@') && (el.content as string).includes('.com')) ||
          (el.content as string).includes('.co.jp')
        ) {
          return (
            <li key={i}>
              <span>
                <a href={`mailto:${el.content}`}>
                  {icon && <Icon icon={icon[i]}></Icon>}
                  <p>{el.content}</p>
                </a>
              </span>
            </li>
          );
        } else {
          return (
            <li key={i}>
              <span>
                {icon && <Icon icon={icon[i]}></Icon>}
                <p>{el.content}</p>
              </span>
            </li>
          );
        }
      })}
    </ul>
  );
}

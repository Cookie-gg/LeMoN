import styles from '../assets/scss/components/Skills.module.scss';
import { Icon as Iconify } from '@iconify/react';
import { Fragment as _ } from 'react';

interface PropsType {
  data: {
    icon: string;
    title: string;
    explanation: string;
    contents: {
      title: string;
      list: string[];
    }[];
  }[];
}
export default function Skills({ data }: PropsType) {
  return (
    <ul className={styles.cards}>
      {data.map((skill, i) => (
        <li key={i} className={styles.card}>
          <Iconify fr={''} icon={skill.icon} className={styles.icon} />
          <h2>{skill.title}</h2>
          <p>{skill.explanation}</p>
          {skill.contents.map((content, j) => (
            <_ key={j}>
              <hr />
              <h3>{content.title}</h3>
              <ul>
                {content.list.map((text, k) => (
                  <li key={k}>{text}</li>
                ))}
              </ul>
            </_>
          ))}
        </li>
      ))}
    </ul>
  );
}

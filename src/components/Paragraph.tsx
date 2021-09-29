import styles from '../assets/scss/components/Paragraph.module.scss';

interface PropsType {
  text: string;
  className?: string;
}

export default function Paragraph({ text, className }: PropsType) {
  return (
    <p className={`${className} ${styles.entire}`}>
      <span>
        {text.split(/\n/).map((text, i) => (
          <span key={i}>
            {text}
            <br />
          </span>
        ))}
      </span>
    </p>
  );
}

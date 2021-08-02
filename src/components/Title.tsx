import styles from '../assets/scss/components/Title.module.scss';
export default function Title({
  rank,
  text,
  className,
}: {
  rank: number;
  text: string;
  className?: string;
}) {
  const Tag = `h${rank}` as React.ElementType;
  return (
    <Tag className={`${className} ${styles.entire}`}>
      <span>
        <span>{text}</span>
      </span>
    </Tag>
  );
}

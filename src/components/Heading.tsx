import styles from '../assets/scss/components/Heading.module.scss';
export default function Heading({
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
      <span>{text}</span>
    </Tag>
  );
}

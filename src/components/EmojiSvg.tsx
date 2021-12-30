import { memo } from 'react';
import styles from '../assets/scss/components/EmojiSvg.module.scss';

function EmojiSvg({
  width = 22.5,
  height = 22.5,
  unicode,
  className,
}: {
  width?: number;
  height?: number;
  unicode: string;
  className?: string;
}) {
  function createSvg(_unicode: string) {
    return (
      <svg width={`${width}`} height={`${height}`} className={`${styles.entire} ${className}`}>
        <use href={`/twemoji.svg#${_unicode}`} />
      </svg>
    );
  }
  return <>{createSvg(unicode)}</>;
}

export default memo(EmojiSvg);

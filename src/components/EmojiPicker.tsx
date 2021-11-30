import { EmojiSvg } from 'components';
import { memo, useState } from 'react';
import json from 'assets/json/emojis.json';
import styles from 'assets/scss/components/EmojiPicker.module.scss';

interface Emoji {
  name: string;
  unicode: string;
  char: string;
}

function EmojiPicker({
  className,
  onSelect,
}: {
  className?: string;
  onSelect?: (emoji: Emoji, index: number, genre: Emoji & { emojis: Emoji[] }) => void;
}) {
  const [activeGenre, _activeGenre] = useState(0);
  return (
    <div className={`${styles.entire} ${className}`}>
      <nav>
        <ul>
          {json.map((emoji, i) => (
            <li
              key={i}
              className={`${i === activeGenre && styles.active}`}
              onClick={() => _activeGenre(i)}
              title={emoji.name}
            >
              <EmojiSvg unicode={emoji.unicode} />
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.emojis}>
        <ul>
          {json[activeGenre].emojis.map((emoji, i) => (
            <li key={i} onClick={() => onSelect && onSelect(emoji, i, json[activeGenre])} title={emoji.name}>
              <EmojiSvg unicode={emoji.unicode} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(EmojiPicker);

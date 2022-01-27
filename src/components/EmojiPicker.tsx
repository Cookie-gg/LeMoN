import { useAxios } from 'hooks';
import { EmojiSvg } from 'components';
import { Icon as Iconify } from '@iconify/react';
import { memo, useEffect, useState } from 'react';
import styles from 'assets/scss/components/EmojiPicker.module.scss';

function EmojiPicker({ keywords, onSelect }: { keywords: string; onSelect?: (emoji: string) => void }) {
  const [activeGenre, _activeGenre] = useState(0);
  const [{ loading, data, error }] = useAxios<
    { name: string; code: string; emojis: { name: string; text: string; unicode: string }[] }[]
  >(`${process.env.NEXT_PUBLIC_MELON}/icon/twemoji`, { headers: { key: `${process.env.NEXT_PUBLIC_ICON_KEY}` } });

  const [result, _result, timeoutResult] = useAxios<{ name: string; text: string; unicode: string }[]>(
    `${process.env.NEXT_PUBLIC_MELON}/icon/twemoji`,
    { headers: { key: `${process.env.NEXT_PUBLIC_ICON_KEY}` } },
    { manual: true, timeout: true },
  );
  useEffect(() => {
    if (keywords.length > 0) {
      _activeGenre(-1);
      timeoutResult && timeoutResult({ reset: true, query: { search: keywords } });
    } else {
      _activeGenre(0);
      _result && _result({ loading: true, data: undefined });
    }
    // eslint-disable-next-line
  }, [keywords]);
  return (
    <div className={styles.entire}>
      <nav>
        {loading && <Iconify fr={''} icon="eos-icons:loading" className={styles.loading} />}
        <ul>
          {data && (
            <>
              {keywords.length > 0 && (
                <li
                  className={`${-1 === activeGenre && styles.active}`}
                  onClick={() => _activeGenre(-1)}
                  title="result"
                >
                  <EmojiSvg unicode="1f50e" />
                </li>
              )}
              {data.map((genre, i) => (
                <li
                  key={genre.name}
                  className={`${i === activeGenre && styles.active}`}
                  onClick={() => _activeGenre(i)}
                  title={genre.name}
                >
                  <EmojiSvg unicode={genre.emojis[0].unicode} />
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
      <div className={styles.emojis}>
        {loading && <Iconify fr={''} icon="eos-icons:loading" className={styles.loading} />}
        {activeGenre === -1 && result.loading && (
          <Iconify fr={''} icon="eos-icons:loading" className={styles.loading} />
        )}
        {(error || result.error) && <div>{error ? error.message : result.error?.message}</div>}
        <ul>
          {data &&
            activeGenre !== -1 &&
            data[activeGenre].emojis.map((emoji) => (
              <li key={emoji.unicode} onClick={() => onSelect && onSelect(emoji.text)} title={emoji.name}>
                <EmojiSvg unicode={emoji.unicode} />
              </li>
            ))}
          {result.data &&
            activeGenre === -1 &&
            (result.data.length > 0 ? (
              result.data.map((emoji) => (
                <li key={emoji.unicode} onClick={() => onSelect && onSelect(emoji.text)} title={emoji.name}>
                  <EmojiSvg unicode={emoji.unicode} />
                </li>
              ))
            ) : (
              <div>Not found.</div>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default memo(EmojiPicker, (prev, next) => prev.keywords === next.keywords);

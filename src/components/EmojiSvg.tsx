import { memo } from 'react';

function EmojiSvg({ width = 22.5, height = 22.5, unicode }: { width?: number; height?: number; unicode: string }) {
  function createSvg(_unicode: string) {
    return (
      <svg width={`${width}`} height={`${height}`}>
        <use href={`/twiEmoji.svg#${_unicode}`} />
      </svg>
    );
  }
  return <>{createSvg(unicode)}</>;
}

export default memo(EmojiSvg);

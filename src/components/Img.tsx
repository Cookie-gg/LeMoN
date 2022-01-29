import { memo } from 'react';
import { Image } from 'utils/libs/next';
import { ImageProps } from 'next/image';

function Img({
  tag = 'div',
  alt,
  src,
  sizes,
  unoptimized,
  priority,
  loading,
  lazyBoundary,
  className,
  quality,
  width,
  height,
  objectFit,
  objectPosition,
  onLoadingComplete,
  loader,
  placeholder,
  blurDataURL,
  ...all
}: ImageProps & { tag?: string; alt: string }) {
  const Tag = tag || ('div' as React.ElementType);
  return (
    <Tag className={className}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        unoptimized={unoptimized}
        priority={priority}
        loading={loading}
        lazyBoundary={lazyBoundary}
        quality={quality}
        width={width}
        height={height}
        objectFit={objectFit}
        objectPosition={objectPosition}
        onLoadingComplete={onLoadingComplete}
        loader={loader}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        {...all}
      />
    </Tag>
  );
}

export default memo(Img);

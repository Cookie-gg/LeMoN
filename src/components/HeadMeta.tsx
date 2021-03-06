import { memo, ReactElement } from 'react';
import { Head, useRouter } from 'utils/libs/next';

interface PropsType {
  title: string;
  description?: string;
  ogImage?: string;
  children?: ReactElement;
  type?: 'page' | 'article';
}

function HeadMeta({ title, description, ogImage, children, type = 'page' }: PropsType) {
  const asPath = useRouter().asPath;
  return (
    <Head>
      <title>{`LeMoN | ${title}`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:url" content={`https://cookie-gg.vercel.app${asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:image" content={ogImage || `${process.env.NEXT_PUBLIC_OG_IMAGE}/${type}/${title}`} />
      <meta name="twitter:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      {children}
    </Head>
  );
}

export default memo(HeadMeta);

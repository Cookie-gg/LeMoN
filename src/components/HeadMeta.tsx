import { memo, ReactElement } from 'react';
import { Head, useRouter } from 'utils/next';

interface PropsType {
  title: string;
  description?: string;
  ogImage?: string;
  children?: ReactElement;
}

function HeadMeta({ title, description, ogImage, children }: PropsType) {
  const asPath = useRouter().asPath;
  return (
    <Head>
      <title>{`LeMoN | ${title}`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:url" content={`https://cookie-gg.vercel.app${asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      {children}
    </Head>
  );
}

export default memo(HeadMeta);

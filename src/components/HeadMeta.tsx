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
      <meta property="og:site_name" content="LeMoN" />
      <meta property="og:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cookie_ggs" />
      {children}
    </Head>
  );
}

export default memo(HeadMeta);

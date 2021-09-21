import { ReactElement } from 'react';
import { Head, useRouter } from 'utils/next';

interface PropsType {
  title: string;
  description?: string;
  children?: ReactElement;
}

export default function HeadMeta({ title, description, children }: PropsType) {
  const asPath = useRouter().asPath;
  return (
    <Head>
      <title>{`LeMoN | ${title}`}</title>
      <meta name="description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:url" content={`https://cookie-gg.vercel.app${asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="LeMoN" />
      <meta property="og:description" content={description ? description : `${title} page of Cookie_gg's Portfolio`} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cookie_ggs" />
      {children}
    </Head>
  );
}

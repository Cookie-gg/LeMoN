// next/** のモジュールのエントリーポイント
export { default as Head } from 'next/head';
export { default as Image } from 'next/image';
export { default as Link } from 'next/link';
export { default as Script } from 'next/script';
export { useRouter } from 'next/router';
export type {
  GetStaticProps,
  GetServerSideProps,
  GetStaticPaths,
  NextApiRequest,
  NextApiResponse,
} from 'next';

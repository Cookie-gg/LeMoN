import { memo, ReactElement } from 'react';
import { Link } from 'utils/next';
import { scrollTopCashe } from './PageFrame';

function Nlink({ href, children }: { href: string; children: ReactElement }) {
  const term = href !== '/blog' && href.includes('/blog') && href !== '/blog/topics';
  return (
    <Link href={term ? '/blog/[...id]' : href} as={term ? href : undefined}>
      <a
        onClick={() => {
          scrollTopCashe.del(href);
        }}
      >
        {children}
      </a>
    </Link>
  );
}
export default memo(Nlink);

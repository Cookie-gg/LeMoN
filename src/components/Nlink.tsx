import { memo, ReactElement } from 'react';
import { Link } from 'utils/next';
import { scrollTopCashe } from './PageFrame';

function Nlink({ href, as, children }: { href: string; as?: string; children?: ReactElement }) {
  return (
    <Link href={href} as={as}>
      <a onClick={() => scrollTopCashe.del(href)}>{children}</a>
    </Link>
  );
}
export default memo(Nlink);

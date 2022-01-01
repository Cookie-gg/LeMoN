import { memo, ReactElement } from 'react';
import { Link } from 'utils/next';
import { scrollTopCashe } from './PageFrame';

function Nlink({ href, as, title, children }: { href: string; as?: string; title?: string; children?: ReactElement }) {
  return (
    <Link href={href} as={as}>
      <a title={title} onClick={() => scrollTopCashe.del(as ? as : href)}>
        {children}
      </a>
    </Link>
  );
}
export default memo(Nlink, (prev, next) => String(prev) === String(next));

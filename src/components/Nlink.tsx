import { Link } from 'utils/libs/next';
import { memo, ReactElement } from 'react';
import { scrollTopCashe } from './MainFrame';

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

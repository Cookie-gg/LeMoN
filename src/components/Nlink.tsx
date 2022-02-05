import { Link } from 'utils/libs/next';
import { memo, ReactElement } from 'react';
import { scrollTopCashe } from './MainFrame';
import * as gtag from 'utils/libs/gtag';

function Nlink({ href, as, title, children }: { href: string; as?: string; title?: string; children?: ReactElement }) {
  return (
    <Link href={href} as={as}>
      <a
        title={title}
        onClick={() => {
          scrollTopCashe.del(as ? as : href);
          gtag.event({ action: 'click_event', category: 'link_button', label: 'event' });
        }}
      >
        {children}
      </a>
    </Link>
  );
}
export default memo(Nlink, (prev, next) => String(prev) === String(next));

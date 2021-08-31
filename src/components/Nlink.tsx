import { Link } from 'utils/next';
import { ReactElement } from 'react';
import { scrollTopCashe } from './PageFrame';

interface PropsType {
  children: ReactElement;
  href: string;
  title?: string;
}

export default function Nlink({ children, href, title }: PropsType) {
  return (
    <Link href={href}>
      <a
        title={title}
        onClick={() => {
          if (href.includes('/blog')) {
            scrollTopCashe.del(href);
            if (href === '/blog') {
              const keys = scrollTopCashe.keys().map((key) => {
                if (key.includes(href + '?display=')) return key;
              });
              if (keys.length > 0) {
                keys.forEach((key) => {
                  scrollTopCashe.del(key as string);
                });
              }
            }
          }
        }}
      >
        {children}
      </a>
    </Link>
  );
}

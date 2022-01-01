import { memo, ReactElement } from 'react';

function DynamicWrapper({
  term,
  tagName,
  children,
  className,
  props,
}: {
  term: boolean | number | undefined;
  tagName: (JSX.IntrinsicAttributes | any)[];
  children: ReactElement[];
  className?: string;
  props: any[];
}) {
  const Tag = term ? tagName[0] : tagName[1];
  return (
    <Tag className={className} {...(term ? props[0] : props[1])}>
      {children.length > 1 ? children.map((child) => child) : children}
    </Tag>
  );
}

export default memo(DynamicWrapper);

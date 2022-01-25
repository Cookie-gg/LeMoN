import { Element, domToReact } from 'html-react-parser';
import { ElementType, ForwardedRef, forwardRef, memo } from 'react';

interface PropsType {
  el: Element;
}

function Heading({ el }: PropsType, ref: ForwardedRef<HTMLHeadingElement>) {
  const Tag = el.name as ElementType;
  return (
    <Tag id={el.attribs.id} ref={ref}>
      {domToReact(el.children)}
    </Tag>
  );
}

export default memo(forwardRef<HTMLHeadingElement, PropsType>(Heading));

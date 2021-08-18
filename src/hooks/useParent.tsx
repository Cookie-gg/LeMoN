import { useState, useEffect, RefObject } from 'react';

export default function useParent<T extends HTMLElement>(target: string, child: RefObject<T>): T | null {
  const [parent, _parent] = useState<T | null>(null);
  useEffect(() => {
    _parent((child.current as T).closest(target) as T);
  }, [target, child]);
  return parent;
}

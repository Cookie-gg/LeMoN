import { useState, useCallback } from 'react';

const useNode: () => [HTMLDivElement | undefined, (node: EventTypes) => void] = () => {
  const [node, _node] = useState<HTMLDivElement>();
  const target = useCallback((node: EventTypes) => {
    const el = node.target as HTMLDivElement;
    _node(el);
  }, []);
  return [node, target];
};
export default useNode;

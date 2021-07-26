import { useState, useCallback } from 'react';

const useNode: () => [HTMLDivElement | undefined, (node: HTMLDivElement) => void] = () => {
  const [node, _node] = useState<HTMLDivElement>();
  const target = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      _node(node);
    }
  }, []);
  return [node, target];
};
export default useNode;

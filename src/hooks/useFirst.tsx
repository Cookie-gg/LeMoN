import { useState, useEffect } from 'react';

export default function useFirst() {
  const [isFirst, _isFirst] = useState<boolean>(true);
  useEffect(() => () => _isFirst(false), []);
  return isFirst;
}

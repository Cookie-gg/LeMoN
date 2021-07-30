import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

export default function useFirst() {
  const [isFirst, _isFirst] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => () => _isFirst(false), [router.pathname]);
  return isFirst;
}

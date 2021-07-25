import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

export default function useFirst() {
  const router = useRouter();
  const [isFirst, _isFirst] = useState<boolean>(true);
  useEffect(() => () => _isFirst(false), [router.pathname]);
  return isFirst;
}

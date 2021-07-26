import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

const useMount = function () {
  const [isMounted, _isMounted] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    _isMounted(true);
    return () => {
      _isMounted(false);
    };
  }, [router.pathname]);
  return isMounted;
};
export default useMount;

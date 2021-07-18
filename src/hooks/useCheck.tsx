import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

const useCheck = function () {
  const [isMounted, _isMounted] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    _isMounted(true);
    return () => {
      _isMounted(false);
    };
  }, [isMounted, router.pathname]);
  return isMounted;
};
export default useCheck;

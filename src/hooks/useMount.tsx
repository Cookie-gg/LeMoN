import { useState, useEffect } from 'react';

const useMount = function () {
  const [isMounted, _isMounted] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => _isMounted(true), 0);
    return () => {
      _isMounted(false);
    };
  }, []);
  return isMounted;
};
export default useMount;

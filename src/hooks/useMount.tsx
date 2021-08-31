import { useState, useEffect } from 'react';

const useMount = function () {
  const [isMounted, _isMounted] = useState<boolean>(false);
  useEffect(() => {
    _isMounted(true);
    return () => {
      _isMounted(false);
    };
  }, []);
  return isMounted;
};
export default useMount;

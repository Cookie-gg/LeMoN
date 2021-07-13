import { useState, useEffect } from 'react';
const useCheck = function () {
  const [isMounted, _isMounted] = useState<boolean>(false);
  useEffect(() => {
    _isMounted(true);
    return () => {
      _isMounted(false);
    };
  }, [isMounted]);
  return isMounted;
};
export default useCheck;

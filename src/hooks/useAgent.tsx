import { useState, useEffect } from 'react';

const useAgent = () => {
  const [isMobile, _isMobile] = useState<boolean>(false);
  useEffect(() => {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/) || window.innerWidth < 820) {
      _isMobile(true);
    }
  }, []);
  return isMobile;
};

export default useAgent;

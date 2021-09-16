import { useWindowDimensions } from 'hooks';
import { useState, useEffect } from 'react';

const useAgent = () => {
  const [isMobile, _isMobile] = useState<boolean>(false);
  const windowWidth = useWindowDimensions().width as number;
  useEffect(() => {
    _isMobile(navigator.userAgent.match(/iPhone|Android.+Mobile/) ? true : false);
  }, [windowWidth]);
  return isMobile;
};

export default useAgent;

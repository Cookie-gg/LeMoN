import { useEffect, useState } from 'react';

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;

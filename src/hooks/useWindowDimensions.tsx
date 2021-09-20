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
    window.addEventListener('touchmove', handleResize);
    window.addEventListener('touchend', handleResize);
    window.addEventListener('touchcancel', handleResize);
    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleResize);
      window.removeEventListener('touchmove', handleResize);
      window.removeEventListener('touchend', handleResize);
      window.removeEventListener('touchcancel', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;

import { useState, useEffect } from 'react';

const useAgent = (
  args:
    | { device: 'windows' | 'iphone' | 'android'; browser: 'msie' | 'edge' | 'chrome' | 'safari' | 'firefox' | 'opera' }
    | 'windows'
    | 'mobile'
    | 'iphone'
    | 'android'
    | 'msie'
    | 'edge'
    | 'chrome'
    | 'safari'
    | 'firefox'
    | 'opera',
) => {
  const [isCorrect, _isCorrect] = useState<boolean>(false);
  useEffect(() => {
    if (typeof args === 'string') {
      _isCorrect(navigator.userAgent.toLowerCase().includes(args));
    } else {
      _isCorrect(
        navigator.userAgent.toLowerCase().includes(args.device) &&
          navigator.userAgent.toLowerCase().includes(args.browser),
      );
    }
  }, [args]);
  return isCorrect;
};

export default useAgent;

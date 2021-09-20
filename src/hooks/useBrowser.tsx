import { useEffect, useState } from 'react';

export default function useBrowser(browserName: 'msie' | 'edge' | 'chrome' | 'safari' | 'firefox' | 'opera'): boolean {
  const [isCorrect, _isCorrect] = useState(false);
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    _isCorrect(userAgent.indexOf(browserName) != -1);
  }, [browserName]);
  return isCorrect;
}

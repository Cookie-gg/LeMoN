import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

export default function useFirstPeriod(duration: number): boolean {
  const asPath = useRouter().asPath;
  const [period, _period] = useState<boolean>(true);
  useEffect(() => {
    _period(true);
    setTimeout(() => _period(false), duration);
    return () => {
      _period(true);
    };
  }, [asPath, duration]);
  return period;
}

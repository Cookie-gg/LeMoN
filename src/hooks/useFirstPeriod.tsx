import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

export default function useFirstPeriod(duration: number): boolean {
  const query = (useRouter().query as { id: string[] }).id[0];
  const [period, _period] = useState<boolean>(true);
  useEffect(() => {
    _period(true);
    setTimeout(() => _period(false), duration);
    return () => {
      _period(true);
    };
  }, [query, duration]);
  return period;
}

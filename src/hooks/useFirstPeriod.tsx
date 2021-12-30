import { useRouter } from 'utils/next';
import { useState, useEffect } from 'react';

export default function useFirstPeriod(duration: number): boolean {
  const router = useRouter();
  const query = `${router.query.id}` || router.pathname;
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

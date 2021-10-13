import { useState, useEffect } from 'react';
import { useRouter } from 'utils/next';

export default function useFirstPeriod(duration: number, useQuery = true): boolean {
  const router = useRouter();
  const dep = useQuery ? (router.query as { id: string[] }).id[0] : router.pathname;
  const [period, _period] = useState<boolean>(true);
  useEffect(() => {
    _period(true);
    setTimeout(() => _period(false), duration);
    return () => {
      _period(true);
    };
  }, [dep, duration]);
  return period;
}

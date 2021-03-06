import nookies from 'nookies';
import { auth } from 'utils/common';
import { useRouter } from 'utils/libs/next';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAuth(): [
  state: boolean,
  login: (name: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
] {
  const router = useRouter();
  const [state, _state] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const refresh = useCallback(() => {
    intervalRef.current = setInterval(async () => {
      try {
        const token = nookies.get(null, 'token')['token'];
        const res = await auth('get', '/refresh', token);
        console.log('refreshed!');
        _state(true);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', res.data.token, { path: '/' });
      } catch {
        _state(false);
        nookies.destroy(null, 'token');
        intervalRef.current && clearTimeout(intervalRef.current);
      }
    }, 60 * 60 * 1000 * 1.5);
  }, []);
  const login = useCallback(
    async (name: string, password: string) => {
      try {
        const res = await auth('post', '/login', undefined, { username: name, password: password });
        _state(true);
        nookies.destroy(null, 'token');
        nookies.set(null, 'token', res.data.token, { path: '/' });
        refresh();
        router.push('/edit');
      } catch {
        _state(false);
      }
    },
    [router, refresh],
  );
  const logout = useCallback(async () => {
    try {
      const token = nookies.get(null, 'token')['token'];
      await auth('get', '/logout', token);
      router.push('/login');
    } catch {
    } finally {
      _state(false);
      nookies.destroy(null, 'token');
      intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [router]);
  useEffect(() => {
    const token = nookies.get(null, 'token')['token'];
    if (token) {
      (async () => {
        try {
          const res = await auth('get', '/refresh', token);
          _state(true);
          nookies.destroy(null, 'token');
          nookies.set(null, 'token', res.data.token, { path: '/' });
          refresh();
        } catch {
          const res = await auth('get', '/deliver', token);
          if (res.data.token) {
            _state(true);
            nookies.destroy(null, 'token');
            nookies.set(null, 'token', res.data.token, { path: '/' });
            refresh();
          } else {
            _state(false);
            nookies.destroy(null, 'token');
            intervalRef.current && clearTimeout(intervalRef.current);
          }
        }
      })();
    }
  }, [refresh]);
  return [state, login, logout];
}

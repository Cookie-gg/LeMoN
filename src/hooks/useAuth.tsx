import axios from 'axios';
import nookies from 'nookies';
import { useRouter } from 'utils/next';
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
        const res = await axios.get<{ token: string }>(`${process.env.NEXT_PUBLIC_MELON}/refresh`, {
          headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`, authorization: `bearer ${token}` },
        });
        console.log('refreshed!');
        _state(true);
        nookies.set(null, 'token', res.data.token);
      } catch {
        _state(false);
        nookies.destroy(null, 'token');
        intervalRef.current && clearTimeout(intervalRef.current);
      }
    }, 2000000);
  }, []);
  const login = useCallback(
    async (name: string, password: string) => {
      try {
        const res = await axios.post<{ token: string }>(
          `${process.env.NEXT_PUBLIC_MELON}/login`,
          { username: name, password: password },
          { headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}` } },
        );
        _state(true);
        nookies.set(null, 'token', res.data.token);
        refresh();
        router.push('/edit');
      } catch {
        _state(false);
      }
    },
    [router, refresh],
  );
  const logout = useCallback(async () => {
    const logoutEvent = () => {
      _state(false);
      nookies.destroy(null, 'token');
      intervalRef.current && clearInterval(intervalRef.current);
    };
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_MELON}/logout`, {
        headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}` },
      });
      logoutEvent();
      router.push('/login');
    } catch {
      logoutEvent();
    }
  }, [router]);
  useEffect(() => {
    const token = nookies.get(null, 'token')['token'];
    token &&
      axios
        .get(`${process.env.NEXT_PUBLIC_MELON}/status`, {
          headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`, authorization: `bearer ${token}` },
        })
        .then(() => {
          _state(true);
          refresh();
        })
        .catch(() => {
          _state(false);
          nookies.destroy(null, 'token');
          intervalRef.current && clearTimeout(intervalRef.current);
        });
  }, [refresh]);
  return [state, login, logout];
}

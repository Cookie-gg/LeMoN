import ky from 'ky';
import { useRouter } from 'utils/next';
import { useCallback, useEffect, useState } from 'react';

export default function useAuth(): [state: boolean, login: (name: string, password: string) => void] {
  const router = useRouter();
  const [state, _state] = useState(false);
  const refresh = useCallback(() => {
    setTimeout(() => {
      ky.get(`${process.env.NEXT_PUBLIC_MELON}/refresh`, {
        headers: {
          key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
          authorization: `bearer ${sessionStorage.getItem('access_token')}`,
        },
      })
        .json<{ token: string }>()
        .then((res) => {
          _state(true);
          sessionStorage.setItem('access_token', res.token);
          refresh();
        })
        .catch(() => {
          _state(false);
          sessionStorage.removeItem('access_token');
        });
    }, 50 * 60 * 1000);
  }, []);
  const login = useCallback(
    (name: string, password: string) => {
      ky.post(`${process.env.NEXT_PUBLIC_MELON}/login`, {
        headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}` },
        json: { username: name, password: password },
      })
        .json<{ token: string }>()
        .then((res) => {
          _state(true);
          sessionStorage.setItem('access_token', res.token);
          refresh();
          router.push('/edit');
        })
        .catch(() => {
          _state(false);
          sessionStorage.removeItem('access_token');
        });
    },
    [router, refresh],
  );
  useEffect(() => {
    sessionStorage.getItem('access_token') &&
      ky
        .get(`${process.env.NEXT_PUBLIC_MELON}/status`, {
          headers: {
            key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
            authorization: `bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
        .json()
        .then(() => {
          _state(true);
          refresh();
        })
        .catch(() => {
          _state(false);
          sessionStorage.removeItem('access_token');
        });
  }, [refresh]);
  return [state, login];
}

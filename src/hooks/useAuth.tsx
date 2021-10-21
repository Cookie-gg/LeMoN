import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'utils/next';

export default function useAuth(): [state: boolean, login: (name: string, password: string) => void] {
  const router = useRouter();
  const [state, _state] = useState(false);
  const refresh = useCallback(() => {
    setTimeout(() => {
      axios
        .get<{ token: string }>(`${process.env.NEXT_PUBLIC_MELON}/refresh`, {
          headers: {
            key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
            authorization: `bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          _state(true);
          sessionStorage.setItem('access_token', res.data.token);
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
      axios
        .post<{ token: string }>(
          `${process.env.NEXT_PUBLIC_MELON}/login`,
          { username: name, password: password },
          { headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}` } },
        )
        .then((res) => {
          _state(true);
          sessionStorage.setItem('access_token', res.data.token);
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
      axios
        .get(`${process.env.NEXT_PUBLIC_MELON}/status`, {
          headers: {
            key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`,
            authorization: `bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
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

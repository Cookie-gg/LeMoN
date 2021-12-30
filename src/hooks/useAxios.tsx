import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

interface StateType<T> {
  loading?: boolean;
  error?: Error;
  data?: T;
  query?: string;
}

type ReturnType<T> = [
  StateType<T>,
  ((arg: StateType<T>) => void) | undefined,
  ((arg: StateType<T>) => void) | undefined,
];

const useAxios = function <T>(
  url: string,
  key?: string,
  type: { none?: boolean; manual?: boolean; timeout?: boolean; lazy?: boolean } = { none: true },
): ReturnType<T> {
  const timerRef = useRef<NodeJS.Timeout>();
  const [{ loading, data, error }, _data] = useState<StateType<T>>({ loading: true });
  useEffect(() => {
    if (type.none && !type.manual && !type.lazy && !type.timeout) {
      (async () => {
        try {
          const res = key ? await axios.get<T>(url, { headers: { key } }) : await axios.get<T>(url);
          _data({ loading: false, data: res.data });
        } catch (error) {
          if (error instanceof Error) _data({ loading: true, error });
        }
      })();
    }
  }, []);
  const dispatch = useCallback((arg: StateType<T>) => _data(arg), []);
  const update = useCallback(
    async (arg: StateType<T>) => {
      if (type.lazy) {
        try {
          const res = await axios.get<T>(url + arg.query, { headers: key ? { key } : undefined });
          _data({ loading: false, data: res.data });
        } catch (error) {
          if (error instanceof Error) _data({ loading: true, error });
        }
      } else if (type.timeout) {
        timerRef.current && clearTimeout(timerRef.current);
        _data({ loading: true, data: undefined });
        timerRef.current = setTimeout(async () => {
          try {
            const res = await axios.get<T>(url + arg.query, { headers: key ? { key } : undefined });
            _data({ loading: false, data: res.data });
          } catch (error) {
            if (error instanceof Error) _data({ loading: false, error });
          }
        }, 1500);
      }
    },
    [url, key, type],
  );
  const returnList: ReturnType<T> = [{ loading, data, error }, undefined, undefined];
  if (type.manual) returnList[1] = dispatch;
  if (type.lazy || type.timeout) returnList[returnList[1] === undefined ? 1 : 2] = update;

  return returnList;
};

export default useAxios;

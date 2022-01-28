import { useEffect, useRef, useState } from 'react';
import axios, { type AxiosRequestConfig } from 'axios';

interface StateType<T> {
  loading?: boolean;
  error?: Error;
  data?: T;
  query?: Partial<{ [key: string]: string | number }>;
  reset?: boolean;
  limit?: number;
}

type ReturnType<T> = [StateType<T>, ...Array<(arg: StateType<T>) => void | Promise<void>>];

const useAxios = function <T>(
  url: string,
  config?: AxiosRequestConfig,
  type: { none?: boolean; manual?: boolean; timeout?: boolean; lazy?: boolean } = { none: true },
): ReturnType<T> {
  const timerRef = useRef<NodeJS.Timeout>();
  const [{ loading, data, error, limit }, _data] = useState<StateType<T>>({ loading: true });
  useEffect(() => {
    if (type.none && !type.manual && !type.lazy && !type.timeout) {
      (async () => {
        try {
          const res = await axios.get<T & { result: T; limit: number }>(url, { ...config });
          if (res.data.limit && res.data.result) {
            _data({ loading: false, data: res.data.result, limit: res.data.limit });
          } else _data({ loading: false, data: res.data });
        } catch (error) {
          if (error instanceof Error) _data({ loading: true, error });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const returnList: ReturnType<T> = [{ loading, data, error, limit }];
  if (type.manual) returnList.push((arg: StateType<T>) => _data(arg));
  if (type.lazy)
    returnList.push(async (arg: StateType<T>) => {
      const queries = arg.query
        ? `?${Object.keys(arg.query)
            .map((key) => arg.query && `${key}=${arg.query[key]}`)
            .join('&')}`
        : '';
      try {
        _data((prev) => ({ loading: true, data: arg.reset ? undefined : prev.data, limit: prev.limit }));
        const res = await axios.get<T>(url + queries, { ...config });
        if (arg.query?.index || arg.query?.limit) {
          _data((prev) => ({
            loading: false,
            data: Object.assign(
              { ...prev.data },
              ...Object.values(res.data).map((v, i) => ({ [`${arg.query?.index}_${i}`]: v })),
            ),
            limit: prev.limit,
          }));
        } else {
          _data((prev) => ({ loading: false, data: res.data, limit: prev.limit }));
        }
      } catch (error) {
        if (error instanceof Error) _data({ loading: true, error });
      }
    });
  if (type.timeout)
    returnList.push(async (arg: StateType<T>) => {
      const queries = arg.query
        ? `?${Object.keys(arg.query)
            .map((key) => arg.query && `${key}=${arg.query[key]}`)
            .join('&')}`
        : '';
      timerRef.current && clearTimeout(timerRef.current);
      _data((prev) => ({ loading: true, data: arg.reset ? undefined : prev.data, limit: prev.limit }));
      timerRef.current = setTimeout(async () => {
        try {
          const res = await axios.get<T & { result: T; limit: number }>(url + queries, { ...config });
          if (res.data.limit && res.data.result) {
            _data({ loading: false, data: res.data.result, limit: res.data.limit });
          } else {
            if (arg.query?.index || arg.query?.limit) {
              _data((prev) => ({
                loading: false,
                data: Object.assign(
                  { ...prev.data },
                  ...Object.values(res.data).map((v, i) => ({ [`${arg.query?.index}_${i}`]: v })),
                ),
                limit: prev.limit,
              }));
            } else {
              _data((prev) => ({ loading: false, data: res.data, limit: prev.limit }));
            }
          }
        } catch (error) {
          if (error instanceof Error) _data({ loading: false, error });
        }
      }, 1500);
    });
  return returnList;
};

export default useAxios;

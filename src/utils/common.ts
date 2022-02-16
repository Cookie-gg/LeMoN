import { Zenn } from 'types/common';
import { ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import zlib from 'react-zlib-js';
import dayjs from 'dayjs';

export const encodeImg: (file: File) => Promise<string | ArrayBuffer | null> = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export function encodeEmoji(input: string) {
  function toCodePoint(input: string, separator = '-') {
    const codePoints = [];
    for (const codePoint of input) {
      codePoints.push(codePoint.codePointAt(0)?.toString(16));
    }
    return codePoints.join(separator);
  }
  // return toCodePoint(input.indexOf(String.fromCharCode(0x200d)) < 0 ? input.replace(/\uFE0F/g, '') : input);
  return toCodePoint(input);
}

export const displayDate = (time: number | 'now', split = '/', compare = false) => {
  const argDate = dayjs(time === 'now' ? undefined : time);
  if (compare) {
    const now = dayjs();
    if (now.year() === argDate.year() && now.month() === argDate.month() && now.date() > argDate.date())
      return `${now.date() - argDate.date()} day${now.date() - argDate.date() === 1 ? '' : 's'} ago`;
    else return argDate.format(`YYYY${split}MM${split}DD`);
  } else return argDate.format(`YYYY${split}MM${split}DD`);
};

export const specifor: <T>(times: number, func: (index: number) => T) => T[] = (times, func) => {
  const list = [];
  for (let i = 0; i < times; i++) {
    list.push(func(i));
  }
  return list;
};

export const publicState = (data: Zenn[], authState?: boolean) =>
  data.filter((value) => {
    if (authState || process.env.NODE_ENV === 'development') return value;
    else if (value.published) return value;
  });

export const cookie = (arg?: string): { [key: string]: string } =>
  arg ? Object.assign({}, ...arg.split('; ').map((q) => ({ [q.split('=')[0]]: q.split('=')[1] }))) : undefined;

export async function auth<T = { token: string }, D = { username: string; password: string }>(
  method: 'get' | 'post',
  endpoint: string,
  token?: string,
  data?: D,
): Promise<AxiosResponse<T>> {
  if (method === 'get') {
    return await axios.get<T>(`${process.env.NEXT_PUBLIC_MELON}${endpoint}`, {
      headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}`, authorization: `bearer ${token}` },
    });
  } else {
    return await axios.post<T>(`${process.env.NEXT_PUBLIC_MELON}${endpoint}`, data, {
      headers: { key: `${process.env.NEXT_PUBLIC_AUTH_KEY}` },
    });
  }
}

export const upload = async (e: ChangeEvent<HTMLInputElement>): Promise<string> => {
  try {
    const file = e.target.files![0];
    const { data } = await axios.get<{ url: string; name: string }>(
      `${process.env.NEXT_PUBLIC_MELON}/storage/upload?fileName=${file.name}`,
      {
        headers: { key: `${process.env.NEXT_PUBLIC_STORAGE_KEY}` },
      },
    );
    if (file.size > 5000000) return 'can not accept a file of 5MB';
    if (!file.type.match(/png|pjp|jpg|(p?)jpeg|jfif|gif/g)) return 'only accept images';
    await axios.put(`${data.url}`, file, { headers: { 'Content-Type': 'application/octet-stream' } });
    return `https://storage.googleapis.com/lemon-storage/${data.name}`;
  } catch (e) {
    return 'failed upload.';
  }
};

export function gzip(str: string) {
  const content = encodeURIComponent(str); // エンコード
  const result = zlib.gzipSync(content); // 圧縮
  const value = result.toString('base64'); // Buffer => base64変換
  return value;
}

export function unzip(value: string) {
  const buffer = Buffer.from(value, 'base64'); // base64 => Bufferに変換
  const result = zlib.unzipSync(buffer).toString(); // 復号化
  const str = decodeURIComponent(result); // デコード (utf-8)
  return str;
}

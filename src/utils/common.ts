import { Zenn } from 'types/common';
import { ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

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

export const displayDate = (arg: Date, split = '/', compare = true) => {
  const date = { y: arg.getFullYear(), m: arg.getMonth(), d: arg.getDate() };
  const display = `${date.y + split}${`0${date.m + 1}`.slice(-2)}${split}${`0${date.d}`.slice(-2)}`;
  if (compare) {
    const now = new Date();
    if (now.getFullYear() === date.y && now.getMonth() === date.m && now.getDate() > date.d)
      return `${now.getDate() - date.d} days ago`;
    else return display;
  } else return display;
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
    else 
    if (value.published) return value;
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
        headers: { authorization: `${process.env.NEXT_PUBLIC_STORAGE_KEY}` },
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

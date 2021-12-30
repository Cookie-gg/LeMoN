import { Zenn } from 'types/common';

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
    else if (value.published) return value;
  });

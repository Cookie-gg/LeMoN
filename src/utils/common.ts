import { Zenn } from 'types/common';

export const encodeImg: (file: File) => Promise<string | ArrayBuffer | null> = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const encodeEmoji: (emoji: string) => string = (emoji) => {
  let comp: number;
  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  }
  comp = (emoji.charCodeAt(0) - 0xd800) * 0x400 + (emoji.charCodeAt(1) - 0xdc00) + 0x10000;
  if (comp < 0) {
    comp = emoji.charCodeAt(0);
  }
  return comp.toString(16);
};

export const displayDate = (arg: Date, split = '/', compare = true) => {
  const date = { y: arg.getFullYear(), m: arg.getMonth(), d: arg.getDate() };
  const display = `${date.y + split}${`0${date.m - 1}`.slice(-2)}${split}${`0${date.d}`.slice(-2)}`;
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

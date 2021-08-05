import { SetStateAction } from 'react';

export function YMD(targetDate: Date) {
  const date = new Date(targetDate);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}
export function setActiveTime(func: (value: SetStateAction<boolean>) => void, duration: number) {
  func((value) => !value);
  setTimeout(() => func((value) => !value), duration);
}
export function sortByDate<T extends { year: number; month: number }[]>(
  data: T,
  type: 'asc' | 'desc',
): T {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - i; j++) {
      if (
        type === 'desc'
          ? data[j - 1].year < data[j].year ||
            (data[j - 1].year === data[j].year && data[j - 1].month < data[j].month)
          : data[j - 1].year < data[j].year ||
            (data[j - 1].year === data[j].year && data[j - 1].month > data[j].month)
      ) {
        let tmp: typeof data[0] = { year: 0, month: 0 };
        tmp = data[j - 1];
        data[j - 1] = data[j];
        data[j] = tmp;
      }
    }
  }
  return data;
}

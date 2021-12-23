import React from 'react';

// グローバルの型定義
declare global {
  type FormTypes = React.FormEvent;
  type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  interface Array<T> {
    specifor<U>(times: number, func: (value: T, index: number, array: T[]) => U): U[];
    rangeMap<U>(start: number, end: number, func: (value: T, index: number, array: T[]) => U): U[];
    sortObj(key: string, type: 'asc' | 'desc' = 'desc', length?: boolean): T[];
  }
}

import React from 'react';

// グローバルの型定義
declare global {
  type FormTypes = React.FormEvent;
  interface Array<T> {
    specifor<U>(times: number, func: (value: T, index: number, array: T[]) => U): U[];
    exSpecifor<U>(times: number, func: (value: T, index: number, array: T[]) => U): U[];
    rangeMap<U>(start: number, end: number, func: (value: T, index: number, array: T[]) => U): U[];
  }
}

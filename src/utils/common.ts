import { SetStateAction } from 'react';

export function formReducer<T>(state: T, e: InputTypes) {
  const { name, value } = e.target;
  return { ...state, ...{ [name]: value } };
}
export function YMD(targetDate: Date) {
  const date = new Date(targetDate);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}
export function setActiveTime(func: (value: SetStateAction<boolean>) => void, duration: number) {
  func((value) => !value);
  setTimeout(() => func((value) => !value), duration);
}

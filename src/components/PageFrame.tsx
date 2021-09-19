import { ReactElement } from 'react';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  return <div className={`${classNmae} ${styles.entire}`}>{children}</div>;
}


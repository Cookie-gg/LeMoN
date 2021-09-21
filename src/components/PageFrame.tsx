import { ReactElement } from 'react';
import memoryCache, { CacheClass } from 'memory-cache';
import styles from '../assets/scss/components/PageFrame.module.scss';
import { useAgent } from 'hooks';

export const scrollTopCashe: CacheClass<string, number> = new memoryCache.Cache();

export default function PageFrame({ children, classNmae }: { children: ReactElement; classNmae?: string }) {
  const agent = useAgent({ device: 'android', browser: 'chrome' });
  return <div className={`${styles.entire} ${classNmae} ${agent && styles.agent}`}>{children}</div>;
}

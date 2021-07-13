import { CMSTypes } from 'types/common';
import { microCMS } from './config.axios';
export function getCMS<T>(endPoint: string): Promise<T & CMSTypes<'get'>> {
  const data = microCMS
    .get(endPoint, {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_GET_API_KEY },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
}

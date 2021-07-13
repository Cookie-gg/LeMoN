import { microCMS } from './config.axios';
export function postCMS<T>(endPoint: string, data: T) {
  microCMS
    .post(endPoint, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-WRITE-API-KEY': process.env.NEXT_PUBLIC_POST_API_KEY,
      },
    })
    .then(() => {
      console.log('送信成功');
    })
    .catch((err) => {
      console.log(err);
      alert('正しく送信できませんでした');
    });
}

import { dataBase } from './config.firebase';

export function postFirebase<T>(collectionName: string, key: string, data: T) {
  const collections = dataBase.collection(collectionName).doc(key);
  collections.set(data);
  return;
}

export function updateFirebase<T>(collectionName: string, key: string, data: T) {
  const collections = dataBase.collection(collectionName).doc(key);
  collections.update(data);
  return;
}

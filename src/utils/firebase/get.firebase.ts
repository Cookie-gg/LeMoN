import { dataBase } from './config.firebase';

// type getFirebaseType = {
//   id: string;
//   coontent: firebase.firestore.DocumentData;
// }[];

export default function getFirebase(collectionName: string, key?: string) {
  const collection = dataBase.collection(collectionName);
  if (key) {
    // collection
    //   .doc(key)
    //   .get()
    //   .then(() => {});
  } else {
    collection.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }
  return;
}

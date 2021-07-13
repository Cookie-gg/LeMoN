import fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FB_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGIN_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};
// firebaseの設定の初期化
if (!fb.apps.length) {
  fb.initializeApp(firebaseConfig);
}
export const firebase = fb;

// firestoreの定義
export const dataBase = firebase.firestore();

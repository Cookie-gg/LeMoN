import { firebase } from './config.firebase';
import { NextRouter } from 'next/router';
// どこからでもconfig.firebaseのfirebaseにアクセスできるように
export { firebase } from './config.firebase';

export const auth = firebase.auth();

// googleアカウントでのログイン
export function googleLogin(e: React.FormEvent, router: NextRouter) {
  // 更新を制御
  e.preventDefault();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        alert('Login is failed.');
      });
  });
}

// メールアドレスでのログイン
export function login(e: React.FormEvent, email: string, password: string, router: NextRouter) {
  // 更新を制御
  e.preventDefault();
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        alert('Login is failed.');
      });
  });
}

// メールアドレスでの登録
export function register(
  e: React.FormEvent,
  email: string,
  password: string,
  confirmPassword: string,
  router: NextRouter,
) {
  // 更新を制御
  e.preventDefault();
  if (email === '' || password === '' || confirmPassword === '') {
    alert('Must be filled in all fields.');
    return;
  }
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // console.log(userCredential);
      router.push('/');
      const user = auth.currentUser;
      if (user) {
        user.sendEmailVerification().then(() => {
          alert('Confirming mail is send successfully.');
        });
      }
    })
    .catch(() => {
      alert(
        'Creating an account is failed.\nAn account has already been created with that email address.',
      );
    });
}

// ログアウト
export function logout(process: void) {
  const cf = confirm('Are you sure to logout?');
  if (cf) {
    auth
      .signOut()
      .then(() => {
        process;
      })
      .catch(() => {
        alert('Logout is failed');
      });
  }
}

// プロフィールの更新
interface Profile {
  displayName: string;
  email: string;
  password: string;
}
export function update(
  e: React.FormEvent,
  change: Profile | { [key: string]: string },
  email: string,
  displayName: string,
) {
  // 更新を制御
  e.preventDefault();
  const user = auth.currentUser;
  if (user) {
    if (!(change.email === email || change.email === '')) {
      user
        .updateEmail(change.email)
        .then(function () {
          alert('Your display email was changed successfully.');
        })
        .catch(function () {
          alert('Profile update is failed.');
        });
    }
    if (!(change.displayName === displayName || change.displayName === '')) {
      user
        .updateProfile({
          displayName: change.displayName,
        })
        .then(() => {
          alert('Your display name was changed successfully.');
        })
        .catch(() => {
          alert('Profile update is failed.');
        });
    }
    if (!(change.password === '')) {
      user
        .updatePassword(change.password)
        .then(() => {
          alert('Your password was changed successfully');
        })
        .catch(() => {
          alert('Profile update is failed.');
        });
    }
  } else {
    return;
  }
}

// パスワードの再設定 (忘れた場合)
export function resettingMail() {
  const email = prompt('Type your email address.');
  if (email && email.includes('@')) {
    auth.sendPasswordResetEmail(email).then(() => {
      alert('Resetting mail is send successfully.');
    });
  } else {
    alert('Type correct email address.');
  }
}

// アカウントの削除
export function deletion(e: React.FormEvent, router: NextRouter) {
  // 更新を制御
  e.preventDefault();
  const cf = confirm('Are you sure to delete your account?');
  if (cf) {
    const user = auth.currentUser;
    if (user) {
      user
        .delete()
        .then(() => {
          alert('Your account was deleted successfully.');
          router.push('/');
        })
        .catch(() => {
          alert('Deleting account was failed. Try again.');
        });
    }
  }
}

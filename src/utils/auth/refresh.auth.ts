import axios from 'axios';

export default async function refresh(name: string, password: string) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH}/login`,
      { username: name, password: password },
      { headers: { key: process.env.NEXT_PUBLIC_AUTH_KEY } },
    );
    sessionStorage.setItem('access_token', res.data.token);
    return true;
  } catch {
    return false;
  }
}

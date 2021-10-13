import axios from 'axios';

export default async function status(token: string) {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_AUTH}/status`, {
      headers: {
        key: process.env.NEXT_PUBLIC_AUTH_KEY,
        authorization: `bearer ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
}

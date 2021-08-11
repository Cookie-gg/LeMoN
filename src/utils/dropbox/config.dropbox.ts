import { Dropbox } from 'dropbox';

const dbx = new Dropbox({
  accessToken: process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN,
});

export default dbx;

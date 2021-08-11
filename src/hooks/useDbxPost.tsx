import { useState } from 'react';
import dbx from 'utils/dropbox/config.dropbox';

function useDbxPost(path: string): [string, (fileList: FileList) => Promise<void>] {
  const [links, _links] = useState<string[]>([]);

  async function upload(fileList: FileList) {
    const res = await dbx.filesUpload({
      path: `${path}/${fileList[0].name}`,
      contents: fileList[0],
    });
    const file = await dbx.filesGetTemporaryLink({
      path: res.result.path_lower as string,
    });
    _links((prev) => [...prev, file.result.link]);
  }
  return [links[0], upload];
}

export default useDbxPost;

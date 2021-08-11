import { useState, useEffect } from 'react';
import dbx from 'utils/dropbox/config.dropbox';

function useDbxGet(path: string): string[] {
  const [links, _links] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const folderData = await dbx.filesListFolder({ path: path });
      folderData.result.entries.forEach(async (el) => {
        const file = await dbx.filesGetTemporaryLink({ path: el.path_lower as string });
        _links((prev) => [...prev, file.result.link]);
      });
    })();
  }, [path]);
  return links;
}

export default useDbxGet;

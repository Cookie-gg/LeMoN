import { useRouter } from 'utils/next';
import loader from '@monaco-editor/loader';
import { useEffect, useState } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

interface CancelablePromise<T> extends Promise<T> {
  cancel: () => void;
}

function useMonaco() {
  const path = useRouter().asPath.split('#')[0];
  const [monaco, setMonaco] = useState(loader.__getMonacoInstance());
  const [cancelable, setCancelable] = useState<CancelablePromise<typeof monacoEditor>>();

  useEffect(() => {
    !monaco && setCancelable(loader.init());
  }, [path, monaco]);

  useEffect(() => {
    cancelable &&
      cancelable.then((monaco) => {
        setMonaco(monaco);
      });
    return () => {
      let _cancelable;
      return (_cancelable = cancelable) === null || _cancelable === void 0 ? void 0 : _cancelable.cancel();
    };
  }, [path, cancelable]);
  return monaco;
}

export default useMonaco;

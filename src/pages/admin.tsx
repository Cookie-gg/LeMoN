import { useState } from 'react';
import { Editor, FunctionsBar, HeadMeta, PageFrame } from 'components';
import pages from '../assets/scss/pages/Admin.module.scss';
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

export default function Admin({ auth }: { auth: { state: boolean } }) {
  const [editor, _editor] = useState<Monaco.editor.IStandaloneCodeEditor | null>(null);
  return (
    <>
      <HeadMeta title="Admin" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Admin`} />
      <PageFrame classNmae={pages.entire}>
        <>
          <FunctionsBar editor={editor} />
          <Editor editor={editor} _editor={(arg: Monaco.editor.IStandaloneCodeEditor | null) => _editor(arg)} />
        </>
      </PageFrame>
    </>
  );
}

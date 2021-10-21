import parse from 'html-react-parser';
import { useRouter } from 'utils/next';
import type { MonacoEditorType } from 'types/common';
import { Fragment as _, memo, useEffect, useRef } from 'react';
import styles from '../assets/scss/components/PreviewBody.module.scss';
import markdown from '../assets/scss/components/Markdown.module.scss';

function PreviewBody({ editor, preview }: { editor: MonacoEditorType; preview: string }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const pathname = useRouter().pathname;
  useEffect(() => {
    if (editor && previewRef.current !== null && pathname === 'edit') {
      editor.onDidScrollChange((e) => {
        (previewRef.current as HTMLDivElement).scrollTo(
          0,
          e.scrollTop * (((previewRef.current as HTMLDivElement).scrollHeight + 1200) / e.scrollHeight),
        );
      });
    }
  }, [editor, pathname]);
  return (
    <div ref={previewRef} className={`${styles.entire} ${markdown.styles}`}>
      {preview.split(/\<.*?table.*?\>/).map((text, i) => (
        <_ key={i}>{i % 2 === 0 ? parse(text) : parse(`<table>${text}</table>`, { trim: true })}</_>
      ))}
    </div>
  );
}

export default memo(PreviewBody);

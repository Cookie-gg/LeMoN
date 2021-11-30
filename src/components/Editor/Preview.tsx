import parse from 'html-react-parser';
import type { MonacoEditorType } from 'types/common';
import { Fragment as _, memo, useEffect, useRef } from 'react';
import styles from '../../assets/scss/components/editor/Preview.module.scss';
import markdown from '../../assets/scss/components/Markdown.module.scss';

function Preview({ editor, html }: { editor: MonacoEditorType; html: string }) {
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editor && previewRef.current !== null) {
      editor.onDidScrollChange((e) => {
        (previewRef.current as HTMLDivElement).scrollTo(
          0,
          e.scrollTop * (((previewRef.current as HTMLDivElement).scrollHeight + 1200) / e.scrollHeight),
        );
      });
      return () => editor.dispose();
    }
  }, [editor]);
  return (
    <div ref={previewRef} className={`${styles.entire} ${markdown.styles}`}>
      {html.split(/\<.*?table.*?\>/).map((text, i) => (
        <_ key={i}>{i % 2 === 0 ? parse(text) : parse(`<table>${text}</table>`, { trim: true })}</_>
      ))}
    </div>
  );
}

export default memo(Preview);

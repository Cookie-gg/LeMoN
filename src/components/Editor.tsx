import axios from 'axios';
import Split from 'react-split';
import parse from 'html-react-parser';
import { useWindowDimensions } from 'hooks';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import styles from '../assets/scss/components/Editor.module.scss';
import * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
import markdown from '../assets/scss/components/Markdown.module.scss';
import { Fragment as _, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'utils/next';

let timer: NodeJS.Timeout;

function Editor({
  editor,
  _editor,
}: {
  editor: Monaco.editor.IStandaloneCodeEditor | null;
  _editor: (arg: Monaco.editor.IStandaloneCodeEditor | null) => void;
}) {
  const monaco = useMonaco();
  const [editorMounted, _editorMounted] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, _preview] = useState('<!-- comment out -->\nコメントアウトは表示されません。');
  const pathname = useRouter().pathname;
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('lemon', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '#FFD500', fontStyle: 'bold' },
          { token: 'keyword.table', foreground: '#FFD500' },
          { token: 'keyword.table.header', foreground: '#FFD500', fontStyle: 'normal' },
          { token: 'comment', foreground: '#9F9F9F' },
          { token: 'string', foreground: '#FFD500' },
          { token: 'variable', foreground: '#FFD500' },
          { token: 'variable.source', foreground: '#D5D5D5' },
        ],
        colors: {
          'editor.background': '#313131',
          'editor.lineHighlightBackground': '#414141',
          'editor.selectionBackground': '#FFD50060',
          'editor.inactiveSelectionBackground': '#FFD50030',
        },
      });
      monaco.editor.setTheme('lemon');
    }
  }, [monaco]);
  useEffect(() => {
    if (editor && previewRef.current !== null && pathname === 'admin') {
      editor.onDidScrollChange((e) => {
        (previewRef.current as HTMLDivElement).scrollTo(
          0,
          e.scrollTop * (((previewRef.current as HTMLDivElement).scrollHeight + 1200) / e.scrollHeight),
        );
      });
    }
    return () => {
      clearTimeout(timer);
    };
  }, [editor, pathname]);
  const window = useWindowDimensions();
  const windowWidth = useCallback(() => (window.width ? window.width : 0), [window]);
  const PreviewBody = () => (
    <div ref={previewRef} className={`${styles.preview} ${markdown.styles}`}>
      {preview.split(/\<.*?table.*?\>/).map((text, i) => (
        <_ key={i}>{i % 2 === 0 ? parse(text) : parse(`<table>${text}</table>`, { trim: true })}</_>
      ))}
    </div>
  );
  return windowWidth() < 820 ? (
    <div className={styles.entire}>
      <MonacoEditor
        height={`${windowWidth() < 500 ? windowWidth() * 0.002 * 300 : 300}px`}
        theme="lemon"
        className={`${styles.editor} ${editorMounted && styles.mounted}`}
        defaultLanguage="markdown"
        defaultValue={'<!-- comment out -->\nコメントアウトは表示されません。'}
        options={{
          fontSize: windowWidth() < 500 ? windowWidth() * 0.002 * 16 : 16,
          fontFamily: 'Noto Sans JP',
          fontWeight: '400',
          letterSpacing: 1.2,
          wordWrap: 'on',
          formatOnType: true,
          minimap: { enabled: false },
          scrollbar: {
            horizontalSliderSize: windowWidth() < 500 ? windowWidth() * 0.002 * 8 : 8,
            verticalSliderSize: windowWidth() < 500 ? windowWidth() * 0.002 * 8 : 8,
          },
        }}
        onMount={(editor) => {
          _editorMounted(true);
          _editor(editor);
        }}
        onChange={(value) => {
          clearTimeout(timer);
          timer = setTimeout(async () => {
            _preview(
              (
                await axios.post<string>(
                  `${process.env.NEXT_PUBLIC_MELON}/markdown/string`,
                  { data: value },
                  { headers: { authorization: `${process.env.NEXT_PUBLIC_MARCDOWN_KEY}` } },
                )
              ).data,
            );
          }, 750);
        }}
      />
      <PreviewBody />
    </div>
  ) : (
    <Split className={styles.entire} gutterSize={10} minSize={windowWidth() * 0.25} snapOffset={0}>
      <MonacoEditor
        height={`${600}px`}
        theme="lemon"
        className={`${styles.editor} ${editorMounted && styles.mounted}`}
        defaultLanguage="markdown"
        defaultValue={'<!-- comment out -->\nコメントアウトは表示されません。'}
        options={{
          fontSize: 16,
          fontFamily: 'Noto Sans JP',
          fontWeight: '400',
          letterSpacing: 1.2,
          wordWrap: 'on',
          formatOnType: true,
          minimap: { enabled: false },
          scrollbar: {
            horizontalSliderSize: 8,
            verticalSliderSize: 8,
          },
        }}
        onMount={(editor) => {
          _editorMounted(true);
          _editor(editor);
        }}
        onChange={(value) => {
          clearTimeout(timer);
          timer = setTimeout(async () => {
            _preview(
              (
                await axios.post<string>(
                  `${process.env.NEXT_PUBLIC_MELON}/markdown/string`,
                  { data: value },
                  { headers: { authorization: `${process.env.NEXT_PUBLIC_MARCDOWN_KEY}` } },
                )
              ).data,
            );
          }, 750);
        }}
      />
      <PreviewBody />
    </Split>
  );
}

export default memo(Editor);

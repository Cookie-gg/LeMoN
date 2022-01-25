import axios from 'axios';
import { useMonaco } from 'hooks';
import MonacoEditor from '@monaco-editor/react';
import type { MonacoEditorType } from 'types/common';
import { memo, useEffect, useRef, useState } from 'react';
import styles from '../../assets/scss/components/editor/EditArea.module.scss';

function Monaco({
  defaultValue,
  _editor,
  _body,
}: {
  defaultValue: string;
  _editor: (arg: MonacoEditorType) => void;
  _body: (arg: { markdown?: string; html?: string }) => void;
}) {
  const monaco = useMonaco();
  const [isMounted, _isMounted] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  // set theme
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
          'editor.background': '#31313100',
          'editor.lineHighlightBackground': '#414141',
          'editor.selectionBackground': '#FFD50060',
          'editor.inactiveSelectionBackground': '#FFD50030',
        },
      });
      monaco.editor.setTheme('lemon');
    }
  }, [monaco]);
  // clear timeout
  useEffect(() => () => timer.current && clearTimeout(timer.current), []);
  return (
    <div>
      <MonacoEditor
        height="100%"
        theme="lemon"
        className={`${styles.entire} ${isMounted && styles.mounted}`}
        defaultLanguage="markdown"
        defaultValue={defaultValue}
        options={{
          fontSize: 16,
          fontFamily: 'Noto Sans JP, sans-serif',
          fontWeight: '400',
          // letterSpacing: 1.2,
          wordWrap: 'on',
          formatOnType: true,
          minimap: { enabled: false },
          scrollbar: {
            horizontalSliderSize: 8,
            verticalSliderSize: 8,
          },
        }}
        onMount={(editor) => {
          _isMounted(true);
          _editor(editor);
        }}
        onChange={(value) => {
          timer.current && clearTimeout(timer.current);
          _body({ markdown: value });
          timer.current = setTimeout(async () => {
            _body({
              html: (
                await axios.post<string>(
                  `${process.env.NEXT_PUBLIC_MELON}/md`,
                  { data: value },
                  { headers: { authorization: `${process.env.NEXT_PUBLIC_MARKDOWN_KEY}` } },
                )
              ).data,
            });
          }, 750);
        }}
      />
    </div>
  );
}

export default memo(Monaco);

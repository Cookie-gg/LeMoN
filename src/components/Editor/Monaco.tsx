import axios from 'axios';
import { useMonaco } from 'hooks';
import MonacoEditor from '@monaco-editor/react';
import type { MonacoEditorType } from 'types/common';
import { memo, useEffect, useRef, useState } from 'react';
import styles from '../../assets/scss/components/editor/EditArea.module.scss';
import { diffLines } from 'diff';

function Monaco({
  _editor,
  body,
  _body,
}: {
  _editor: (arg: MonacoEditorType) => void;
  body: { markdown: string; html: string };
  _body: (arg: { markdown?: string; html?: string }) => void;
}) {
  const monaco = useMonaco();
  const [isMounted, _isMounted] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  const controller = new AbortController();
  const [prevValue, _prevValue] = useState(body.markdown);
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
      monaco.languages.registerCompletionItemProvider('markdown', {
        provideCompletionItems: (m, position) => {
          return {
            suggestions: [
              ...[1, 2, 3, 4, 5, 6].map((i) => ({
                label: `Heading:${i}`,
                documentation: `${i}st Heading`,
                insertText: [`# $1`],
              })),
              { label: 'List:unorder', documentation: 'Unorder List', insertText: ['- $1'] },
              { label: 'List:order', documentation: 'Order List', insertText: ['1 $1'] },
              { label: 'Link:normal', documentation: 'Normal Link', insertText: ['[$1]($2)'] },
              { label: 'Link:card', documentation: 'Link Card', insertText: ['\nhttps://cookie-gg.dev/'] },
              { label: 'Image:normal', documentation: 'Image with Alt Text', insertText: ['![$1]($2)'] },
              { label: 'Image:size', documentation: 'Image with Size Config', insertText: ['![$1]($2 =$3)'] },
              { label: 'Image:caption', documentation: 'Image with Caption', insertText: ['![$1]($2)', '*$3*'] },
              { label: 'Image:title', documentation: 'Image with Title', insertText: ['[![$1]($2)]($3)]'] },
              {
                label: 'Table',
                documentation: 'Table',
                insertText: ['| Head | Head | Head |', '| ------ | ------ | ------ |', '|  Text  |  Text  |  Text  |'],
              },
              { label: 'Code:inline', documentation: 'Inline Code', insertText: ['`$1`'] },
              { label: 'Code:block', documentation: 'Code Block', insertText: ['```$1', '$2', '```'] },
              { label: 'Code:file', documentation: 'Code Block with File Name', insertText: ['```$1:$2', '$3', '```'] },
              { label: 'Code:diff', documentation: 'Code Block with Diff', insertText: ['```diff $1', '$2', '```'] },
              { label: 'Math:inline', documentation: 'Inline Math', insertText: ['$$1$'] },
              { label: 'Math:block', documentation: 'Math Block', insertText: ['$$', '$1', '$$'] },
              { label: 'Reference', documentation: 'Reference', insertText: ['> $1'] },
              { label: 'Footnote', documentation: 'Footnote', insertText: ['[^$1]', '[^$1]:$1'] },
              { label: 'Divide', documentation: 'Divide Line', insertText: ['---'] },
              { label: 'Text:italic', documentation: 'Italic Text Style', insertText: ['*$1*'] },
              { label: 'Text:bold', documentation: 'Bold Text Style', insertText: ['**$1**'] },
              { label: 'Text:negative', documentation: 'Text with Negative Line', insertText: ['~~$1~~'] },
              { label: 'Box:message', documentation: 'Message Box', insertText: [':::message', '$1', ':::'] },
              { label: 'Box:alert', documentation: 'Alert Box', insertText: [':::message alert', '$1', ':::'] },
              { label: 'Box:details', documentation: 'Details Box', insertText: [':::details $1', '$2', ':::'] },
            ].map(({ label, documentation, insertText }) => ({
              label,
              kind: monaco.languages.CompletionItemKind.Snippet,
              documentation,
              insertText: insertText.join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                startColumn: 0,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
            })),
          };
        },
      });
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
        defaultValue={body.markdown}
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
            controller.signal.aborted && controller.abort();
            if (value) {
              const diffs = diffLines(prevValue, value, { newlineIsToken: true });
              const { added, value: addedValue } = diffs[diffs.length - 1];
              const onlyAdditon = added && !diffs[diffs.length - 2].removed;
              _body({
                html: 
                  (onlyAdditon ? body.html : '') +
                    (
                      await axios.post<string>(
                        `${process.env.NEXT_PUBLIC_MELON}/md`,
                        { data: (onlyAdditon ? addedValue : value) },
                        {
                          headers: { key: `${process.env.NEXT_PUBLIC_MARKDOWN_KEY}` },
                          signal: controller.signal,
                        },
                      )
                    ).data,
              });
              _prevValue(value);
            }
            controller.abort();
          }, 1500);
        }}
      />
    </div>
  );
}

export default memo(Monaco);

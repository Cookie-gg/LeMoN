import { memo } from 'react';
import { Icon as Iconify } from '@iconify/react';
import type { MonacoEditorType } from 'types/common';
import styles from '../assets/scss/components/EditorMenu.module.scss';

function EditorMenu({
  editor,
  quickEdits,
}: {
  editor: MonacoEditorType;
  quickEdits: {
    icon: string;
    title: string;
    text: string;
    newLine: boolean;
  }[];
}) {
  return (
    <ul className={styles.entire}>
      {quickEdits.map((edit, i) => (
        <a title={edit.title} key={i}>
          <Iconify
            icon={edit.icon}
            onClick={() => {
              const selection = editor && editor.getSelection();
              if (selection) {
                editor.executeEdits('functions', [
                  {
                    range: {
                      startColumn: selection.startColumn,
                      startLineNumber: selection.startLineNumber,
                      endColumn: selection.endColumn,
                      endLineNumber: selection.endLineNumber,
                    },
                    text:
                      edit.newLine && selection.startColumn !== 1 && selection.endColumn !== 1
                        ? `\n\n${edit.text}`
                        : edit.text,
                    forceMoveMarkers: true,
                  },
                ]);
                editor.focus();
              }
            }}
          />
        </a>
      ))}
    </ul>
  );
}
export default memo(EditorMenu);

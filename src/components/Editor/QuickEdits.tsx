import { memo, useCallback, useMemo } from 'react';
import { Icon as Iconify } from '@iconify/react';
import type { MonacoEditorType } from 'types/common';
import styles from '../../assets/scss/components/editor/QuickEdits.module.scss';
import { upload } from 'utils/common';

function QuickEdits({ editor }: { editor: MonacoEditorType }) {
  const quickEdits: { icon: string; title: string; text: string; newLine: boolean; needUpload?: boolean }[] = useMemo(
    () => [
      { icon: 'gridicons:heading-h1', title: '見出し1', text: '# ', newLine: true },
      { icon: 'gridicons:heading-h2', title: '見出し2', text: '## ', newLine: true },
      { icon: 'gridicons:heading-h3', title: '見出し3', text: '### ', newLine: true },
      {
        icon: 'ic:round-format-list-bulleted',
        title: '順序なしリスト',
        text: '- Hello!\n  - World!',
        newLine: true,
      },
      {
        icon: 'ic:round-format-list-numbered',
        title: '順序ありリスト',
        text: '1. First\n2. Second',
        newLine: true,
      },
      {
        icon: 'ic:baseline-add-link',
        title: 'アンカーテキスト',
        text: '[アンカーテキスト](リンクのURL)',
        newLine: false,
      },
      { icon: 'jam:id-card-f', title: 'リンクカード', text: '\nhttps://cookie-gg.vercel.app/', newLine: true },
      { icon: 'ic:baseline-image', title: '画像', text: '![altテキスト](https://画像のURL)', newLine: true },
      {
        icon: 'mdi:image-plus',
        title: '画像 (アップロード)',
        text: '![altテキスト](https://画像のURL)',
        newLine: true,
        needUpload: true,
      },
      {
        icon: 'mdi:image-size-select-large',
        title: '画像 (サイズ設定あり)',
        text: '![altテキスト](https://画像のURL =250x)',
        newLine: true,
      },
      {
        icon: 'mdi:signature-image',
        title: '画像 (キャプション付き)',
        text: '![](https://画像のURL)\n*キャプション*',
        newLine: true,
      },
      {
        icon: 'mdi:image-move',
        title: '画像 (タイトル付き)',
        text: '[![](https://画像のURL)](リンクのURL)',
        newLine: true,
      },
      {
        icon: 'ic:outline-table-chart',
        title: 'テーブル',
        text: '| Head | Head | Head |\n| ------ | ------ | ------ |\n|  Text  |  Text  |  Text  |',
        newLine: true,
      },
      { icon: 'ci:window-code-block', title: 'コードブロック', text: '```\ncode\n```', newLine: true },
      {
        icon: 'tabler:file-code',
        title: 'コードブロック (ファイル名付き)',
        text: '```lang-name:ファイル名\ncode with file name\n```',
        newLine: true,
      },
      {
        icon: 'tabler:code-plus',
        title: 'コードブロック (diff付き)',
        text: '```diff lang-name:ファイル名\n@@ -4,6 +4,5 @@\n+    add code\n-    delete code\n```',
        newLine: true,
      },
      { icon: 'fluent:math-formula-16-filled', title: '数式 (Katex方式)', text: '$$\n\n$$', newLine: true },
      { icon: 'ic:round-format-quote', title: '引用', text: '> ', newLine: true },
      {
        icon: 'heroicons-outline:annotation',
        title: '注釈',
        text: '脚注の例[^1]です。\n[^1]: 脚注の内容その1',
        newLine: true,
      },
      { icon: 'ic:baseline-horizontal-rule', title: '区切り線', text: '---', newLine: true },
      { icon: 'ic:round-format-italic', title: 'イタリック', text: '*イタリック*', newLine: false },
      { icon: 'ic:round-format-bold', title: '太字', text: '**太字**', newLine: false },
      { icon: 'ic:round-format-strikethrough', title: '打ち消し線', text: '~~打ち消し線~~', newLine: false },
      { icon: 'ic:round-code', title: 'インラインコード', text: '`code`', newLine: false },
      {
        icon: 'ic:round-add-alert',
        title: 'メッセージボックス',
        text: ':::message\nメッセージをここに\n:::',
        newLine: true,
      },
      {
        icon: 'ic:round-warning',
        title: '警告メッセージボックス',
        text: ':::message alert\n警告メッセージをここに\n:::',
        newLine: true,
      },
      {
        icon: 'ic:round-all-inbox',
        title: 'アコーディオンボックス',
        text: ':::details タイトル\n表示したい内容\n:::',
        newLine: true,
      },
    ],
    [],
  );
  const insertHandler = useCallback(
    (text: string, newLine: boolean) => {
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
            text: newLine && selection.startColumn !== 1 && selection.endColumn !== 1 ? `\n\n${text}` : text,
            forceMoveMarkers: true,
          },
        ]);
        editor.focus();
      }
    },
    [editor],
  );
  return (
    <ul className={styles.entire}>
      {quickEdits.map((edit, i) => {
        return (
          <a title={edit.title} key={i}>
            {edit.needUpload ? (
              <>
                <input
                  type="file"
                  accept=".png,.pjp,.jpg,.pjpeg,.jfif,.gif"
                  onChange={async (e) => insertHandler(`![altテキスト](${await upload(e)})`, edit.newLine)}
                />
                <Iconify fr={''} icon={edit.icon} />
              </>
            ) : (
              <Iconify fr={''} icon={edit.icon} onClick={() => insertHandler(edit.text, edit.newLine)} />
            )}
          </a>
        );
      })}
    </ul>
  );
}
export default memo(QuickEdits);

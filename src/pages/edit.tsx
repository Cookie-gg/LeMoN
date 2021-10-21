import { useForm } from 'hooks';
import Split from 'react-split';
import { memo, useState } from 'react';
import json from 'assets/json/Edit.json';
import { EmojiValidation } from 'utils/common';
import type { MonacoEditorType } from 'types/common';
import styles from '../assets/scss/pages/Edit.module.scss';
import { EditorBody, EditorMenu, HeadMeta, PageFrame, PreviewBody } from 'components';

function Page({ auth }: { auth: { state: boolean } }) {
  const now = new Date();
  const [input, change] = useForm({
    title: '',
    id: '',
    emoji: '🍋',
    type: 'tech',
    topics: '',
    published: false,
    releaseDate: `${now.getFullYear()}-${('0' + String(now.getMonth() + 1)).slice(-2)}-${now.getDate()}`,
    updateDate: `${now.getFullYear()}-${('0' + String(now.getMonth() + 1)).slice(-2)}-${now.getDate()}`,
    body: '<!-- comment out -->\nコメントアウトは表示されません。',
  });
  const [editor, _editor] = useState<MonacoEditorType>(null);
  const [preview, _preview] = useState(json.editor.defaultValue);
  return (
    <>
      <HeadMeta title={json.title} ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/${json.title}`} />
      <PageFrame classNmae={styles.entire}>
        <>
          <aside>
            <label>Title</label>
            <input type="text" name="title" value={input.title} onChange={(e) => change(e)} placeholder="title" />
            <label>Id / Slug</label>
            <input type="text" name="id" value={input.id} onChange={(e) => change(e)} placeholder="id / slug" />
            <label>Emoji</label>
            <input
              name="emoji"
              type="emoji"
              value={input.emoji}
              onChange={(e) => {
                console.log(e.target.value.length);
                console.log(e.target.value.match(EmojiValidation) ? true : false);
                change(e);
              }}
            />
            <label>Type</label>
            <label className={styles.check_input}>
              <input
                type="radio"
                name="type"
                value="tech"
                onChange={(e) => change(e)}
                checked={input.type === 'tech'}
              />
              <span>Tech</span>
            </label>
            <label className={styles.check_input}>
              <input
                type="radio"
                name="type"
                value="idea"
                onChange={(e) => change(e)}
                checked={input.type === 'idea'}
              />
              <span>Idea</span>
            </label>
            <label>Topics</label>
            <textarea
              name="topics"
              value={input.topics}
              onChange={(e) => change(e)}
              placeholder="type topics for each line"
            />
            <label>Published</label>
            <label className={styles.check_input}>
              <input type="checkbox" name="published" value="on" onChange={(e) => change(e)} />
              <span>True</span>
            </label>
            <label>Release Date</label>
            <input type="date" name="releaseDate" value={input.releaseDate} onChange={(e) => change(e)} />
            <label>Update Date</label>
            <input type="date" name="updateDate" value={input.updateDate} onChange={(e) => change(e)} />
          </aside>
          <main>
            <EditorMenu editor={editor} quickEdits={json.editor.quickEdits} />
            <Split className={styles.editor} gutterSize={12} minSize={350} snapOffset={0}>
              <EditorBody
                defaultValue={input.body}
                _editor={(arg: MonacoEditorType) => _editor(arg)}
                _preview={(arg: string) => _preview(arg)}
              />
              <PreviewBody editor={editor} preview={preview} />
            </Split>
          </main>
        </>
      </PageFrame>
    </>
  );
}

export default memo(Page, (prev, next) => prev.auth.state === next.auth.state);

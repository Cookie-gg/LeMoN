import Split from 'react-split';
import { Icon as Iconify } from '@iconify/react';
import { useForm, useWindowDimensions } from 'hooks';
import { Router } from 'utils/libs/next';
import { useRouter } from 'utils/libs/next';
import { displayDate } from 'utils/common';
import { client } from 'graphql/config.gql';
import { getFile } from 'utils/github/get.github';
import type { MonacoEditorType, Zenn, ZennAdds } from 'types/common';
import { FormEvent, memo, useCallback, useContext, useEffect, useState } from 'react';
import styles from '../../assets/scss/components/editor/Editor.module.scss';
import { deleteFile, updateFile, createFile } from 'utils/github/post.github';
import { ArticleInput, ChangeArticleDocument, DeleteArticleDocument } from 'types/graphql.d';
import { NotiContext } from 'pages/_app';
// components
import Monaco from './Monaco';
import Preview from './Preview';
import SideMenu from './SideMenu';
import QuickEdits from './QuickEdits';

function Editor({ data = {} }: { data?: Partial<Zenn & ZennAdds> }) {
  const router = useRouter();
  const w = useWindowDimensions();
  const notification = useContext(NotiContext);
  const [sideEnable, _sideEnable] = useState(true);
  const [previewEnable, _previewEnable] = useState(false);
  const [editor, _editor] = useState<MonacoEditorType>(null);
  const init = '<!-- comment out -->\nコメントアウトは表示されません。';
  const [isSaved, _isSaved] = useState(true);
  const [body, _body] = useState({ markdown: data.markdown || init, html: data.html || init });
  const [meta, onChange, dispatch] = useForm(
    {
      title: data.title || '',
      articleId: data.articleId || '',
      emoji: data.emoji || '🍋',
      type: data.type?.toLowerCase() || 'tech',
      topics: data.topics?.map((topic) => topic.toLowerCase()) || [''],
      published: data.published || false,
      releaseDate: displayDate(data.releaseDate ? data.releaseDate : 'now', '-'),
      updateDate: displayDate('now', '-'),
    },
    () => _isSaved(false),
  );
  const idValidate = useCallback((target: HTMLInputElement) => {
    if (target.value === '') {
      target.setCustomValidity('このフィールドを入力してください。');
    } else if (!target.value.match(/^[0-9a-z_-]*$/)) {
      target.setCustomValidity(
        '半角英小文字 (a-z)、半角数字 (0-9)、ハイフン (-)、アンダースコア (_)の文字を使うことができます。',
      );
    } else if (!target.value.match(/^[0-9a-z_-]{12,50}$/)) {
      target.setCustomValidity('12〜50字の組み合わせにする必要があります。');
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  }, []);
  const saveHandler = useCallback(
    async (submitter: string) => {
      const variables = Object.assign(meta, { id: data.id || '', markdown: body.markdown, html: body.html });
      const { id, articleId, title, emoji, type, topics, published, markdown } = variables;
      if (submitter === 'save' || submitter === 'zenn') {
        await client.mutate<ArticleInput>({ mutation: ChangeArticleDocument, variables });
        console.log('mongodb!');
        if (submitter === 'zenn') {
          if (data.articleId !== articleId || id === '') {
            try {
              await deleteFile(`articles/${data.articleId}.md`);
            } finally {
              await createFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
            }
          } else {
            try {
              await getFile(`articles/${data.articleId}.md`); // confirm file exiting
              await updateFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
            } catch {
              await createFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
            }
          }
        }
        console.log('github!');
        _isSaved(true);
        notification && notification('保存しました');
      } else if (
        submitter === 'delete' &&
        confirm(`一度削除すると元に戻りません。本当に ${data.title || title || 'タイトルなし'} を削除しますか？`)
      ) {
        await client.mutate<ArticleInput>({ mutation: DeleteArticleDocument, variables: { id } });
        await deleteFile(`articles/${data.articleId}.md`);
        notification && notification('削除しました');
        router.push('/blog');
      }
    },
    [body.html, body.markdown, data.articleId, data.id, data.title, meta, notification, router],
  );
  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      idValidate(
        e.currentTarget[Number(Object.keys(meta).findIndex((key) => key === 'articleId'))] as HTMLInputElement,
      );
      const submitter = (e.nativeEvent as Event & { submitter: HTMLInputElement }).submitter.name;
      saveHandler(submitter);
    },
    [idValidate, meta, saveHandler],
  );
  useEffect(() => {
    if (!isSaved) {
      const routeChangeHandler = () => confirm('変更が見つかりました。保存して終了しますか？') && saveHandler('save');
      const windowCloseHandler = (e: BeforeUnloadEvent) => {
        Router.events.off('routeChangeStart', routeChangeHandler);
        e.preventDefault();
        e.returnValue = '';
      };
      Router.events.on('routeChangeStart', routeChangeHandler);
      window.addEventListener('beforeunload', windowCloseHandler);
      return () => {
        Router.events.off('routeChangeStart', routeChangeHandler);
        window.removeEventListener('beforeunload', windowCloseHandler);
      };
    }
  }, [isSaved, saveHandler]);
  return (
    <div className={`${styles.entire} ${sideEnable && styles.opened}`}>
      <div className={styles.gutter}>
        <button onClick={() => _sideEnable((prev) => !prev)} />
      </div>
      <SideMenu
        meta={meta}
        onChange={(e) => onChange(e)}
        dispatch={({ name, value }) => dispatch({ name, value })}
        submit={(e) => submit(e)}
        idValidate={(e) => idValidate(e)}
      />
      <div className={styles.main}>
        <QuickEdits editor={editor} />
        {w.width && w.width < 1250 ? (
          <div className={`${styles.editor} ${previewEnable && styles.enable}`}>
            <button className={styles.switch} onClick={() => _previewEnable((prev) => !prev)}>
              <Iconify fr={''} icon={previewEnable ? 'ic:round-mode-edit-outline' : 'bx:bxs-right-arrow'} />
            </button>
            <Monaco
              _editor={(arg) => _editor(arg)}
              body={body}
              _body={(arg) => {
                _isSaved(false);
                _body((prev) => ({ ...prev, ...arg }));
              }}
            />
            <Preview editor={editor} html={body.html} />
          </div>
        ) : (
          <Split className={styles.editor} gutterSize={12} minSize={350} snapOffset={0}>
            <Monaco
              _editor={(arg) => _editor(arg)}
              body={body}
              _body={(arg) => {
                _isSaved(false);
                _body((prev) => ({ ...prev, ...arg }));
              }}
            />
            <Preview editor={editor} html={body.html} />
          </Split>
        )}
      </div>
    </div>
  );
}

export default memo(Editor);

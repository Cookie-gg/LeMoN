import Split from 'react-split';
import { useForm } from 'hooks';
import { useRouter } from 'utils/next';
import { displayDate } from 'utils/common';
import { client } from 'graphql/config.gql';
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { MonacoEditorType, Zenn, ZennAdds } from 'types/common';
import styles from '../../assets/scss/components/editor/Editor.module.scss';
import { deleteFile, updateFile, createFile } from 'utils/github/post.github';
import { ArticleInput, ChangeArticleDocument, DeleteArticleDocument } from 'types/graphql.d';
import { Router } from 'utils/next';
// components
import Monaco from './Monaco';
import Preview from './Preview';
import SideMenu from './SideMenu';
import QuickEdits from './QuickEdits';
import { getFile } from 'utils/github/get.github';

function Editor({ data = {} }: { data?: Partial<Zenn & ZennAdds> }) {
  const router = useRouter();
  const [editor, _editor] = useState<MonacoEditorType>(null);
  const init = '<!-- comment out -->\nコメントアウトは表示されません。';
  const [body, _body] = useState({ markdown: data.markdown || init, html: data.html || init });
  const prevData = useMemo(
    () => ({
      title: data.title || '',
      articleId: data.articleId || '',
      emoji: data.emoji || '🍋',
      type: data.type?.toLowerCase() || 'tech',
      topics: data.topics?.map((topic) => topic.toLowerCase()) || [''],
      published: data.published || false,
      releaseDate: displayDate(data.releaseDate ? new Date(data.releaseDate) : new Date(), '-', false),
      updateDate: displayDate(new Date(), '-', false),
    }),
    [data.articleId, data.emoji, data.published, data.releaseDate, data.title, data.topics, data.type],
  );
  const [meta, onChange, dispatch] = useForm(prevData);
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
    async (submitter = 'save') => {
      const { id, articleId, published, releaseDate, updateDate, title, emoji, type, topics, markdown, html } =
        Object.assign(meta, { id: data.id || '', markdown: body.markdown, html: body.html });
      if (submitter === 'save') {
        await client.mutate<ArticleInput>({
          mutation: ChangeArticleDocument,
          variables: { id, articleId, published, releaseDate, updateDate, title, emoji, type, topics, html, markdown },
        });
        console.log('mongoDb!');
        if (data.articleId !== articleId) {
          try {
            await getFile(`articles/${data.articleId}.md`); // confirm file exiting
            await deleteFile(`articles/${data.articleId}.md`);
            console.log('delete!');
          } finally {
            await createFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
            console.log('create!');
          }
        } else {
          await updateFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
          console.log('update!');
        }
      } else if (
        submitter === 'delete' &&
        confirm(`一度削除すると元に戻りません。本当に ${data.title || title || 'タイトルなし'} を削除しますか？`)
      ) {
        await client.mutate<ArticleInput>({ mutation: DeleteArticleDocument, variables: { id } });
        await deleteFile(`articles/${data.articleId}.md`);
        router.push('/blog');
      }
    },
    [body.html, body.markdown, data.articleId, data.id, data.title, meta, router],
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
  useEffect(
    () => () => {
      if (editor) editor.dispose();
    },
    [editor],
  );
  const dependencies = JSON.stringify(prevData) !== JSON.stringify(meta);
  useEffect(() => {
    if (dependencies) {
      const routeChangeHandler = () => confirm('変更が見つかりました。保存して終了しますか？') && saveHandler();
      Router.events.on('routeChangeStart', routeChangeHandler);
      return () => Router.events.off('routeChangeStart', routeChangeHandler);
    }
  }, [dependencies, saveHandler]);
  return (
    <div className={styles.entire}>
      <SideMenu
        meta={meta}
        onChange={(e) => onChange(e)}
        dispatch={({ name, value }) => dispatch({ name, value })}
        submit={(e) => submit(e)}
        idValidate={(e) => idValidate(e)}
      />
      <div className={styles.main}>
        <QuickEdits editor={editor} />
        <Split className={styles.editor} gutterSize={12} minSize={350} snapOffset={0}>
          <Monaco
            defaultValue={body.markdown}
            _editor={(arg) => _editor(arg)}
            _body={(arg) => _body((prev) => ({ ...prev, ...arg }))}
          />
          <Preview editor={editor} html={body.html} />
        </Split>
      </div>
    </div>
  );
}

export default memo(Editor);

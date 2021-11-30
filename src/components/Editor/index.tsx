import Split from 'react-split';
import { useForm } from 'hooks';
import { useRouter } from 'utils/next';
import { displayDate } from 'utils/common';
import { client } from 'graphql/config.gql';
import { getFile } from 'utils/github/get.github';
import { FormEvent, memo, useCallback, useState } from 'react';
import type { MonacoEditorType, Zenn, ZennAdds } from 'types/common';
import styles from '../../assets/scss/components/editor/Editor.module.scss';
import { deleteFile, updateFile, createFile } from 'utils/github/post.github';
import { ArticleInput, ChangeArticleDocument, DeleteArticleDocument } from 'types/graphql.d';
// components
import Monaco from './Monaco';
import Preview from './Preview';
import SideMenu from './SideMenu';
import QuickEdits from './QuickEdits';

function Editor({ data }: { data: Partial<Zenn & ZennAdds> }) {
  const router = useRouter();
  const [editor, _editor] = useState<MonacoEditorType>(null);
  const init = '<!-- comment out -->\nコメントアウトは表示されません。';
  const [body, _body] = useState({ markdown: data.markdown || init, html: data.html || init });
  const [meta, onChange, dispatch] = useForm({
    title: data.title || '',
    articleId: data.articleId || '',
    emoji: data.emoji || '🍋',
    type: data.type?.toLowerCase() || 'tech',
    topics: data.topics?.map((topic) => topic.toLowerCase()) || [''],
    published: data.published || false,
    releaseDate: displayDate(data.releaseDate ? new Date(data.releaseDate) : new Date(), '-', false),
    updateDate: displayDate(new Date(), '-', false),
  });
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
  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      idValidate(
        e.currentTarget[Number(Object.keys(meta).findIndex((key) => key === 'articleId'))] as HTMLInputElement,
      );
      const submitter = (e.nativeEvent as Event & { submitter: HTMLInputElement }).submitter.name;
      const { id, articleId, published, releaseDate, updateDate, title, emoji, type, topics, markdown, html } =
        Object.assign(meta, { id: data.id || '', markdown: body.markdown, html: body.html });
      if (submitter === 'save') {
        await client.mutate<ArticleInput>({
          mutation: ChangeArticleDocument,
          variables: { id, articleId, published, releaseDate, updateDate, title, emoji, type, topics, html, markdown },
        });
        getFile(`articles/${articleId}.md`)
          .then(async () => {
            if (articleId !== data.articleId) await deleteFile(`articles/${articleId}.md`);
            updateFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
          })
          .catch(() => {
            createFile(`articles/${articleId}.md`, { title, emoji, type, topics, published, markdown });
          });
      } else if (
        submitter === 'delete' &&
        confirm(`一度削除すると元に戻りません。本当に ${data.title || 'タイトルなし'} を削除しますか？`)
      ) {
        await client.mutate<ArticleInput>({ mutation: DeleteArticleDocument, variables: { id } });
        await deleteFile(`articles/${articleId}.md`);
        router.push('/blog');
      }
    },
    [body.html, body.markdown, data.articleId, data.id, data.title, idValidate, meta, router],
  );
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

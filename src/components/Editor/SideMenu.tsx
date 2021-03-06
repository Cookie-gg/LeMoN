import Topics from './Topics';
import { encodeEmoji } from 'utils/common';
import { EmojiPicker, EmojiSvg } from 'components';
import styles from '../../assets/scss/components/editor/SideMenu.module.scss';
import React, { useState, useRef, memo, FormEvent, ChangeEvent, useEffect } from 'react';

function SideMenu({
  meta,
  onChange,
  dispatch,
  idValidate,
  submit,
}: {
  meta: {
    title: string;
    articleId: string;
    emoji: string;
    type: string;
    topics: string[];
    published: boolean;
    releaseDate: string;
    updateDate: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  dispatch: ({ name, value }: { name: string; value: string }) => void;
  idValidate: (target: HTMLInputElement) => void;
  submit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const [keywords, _keywords] = useState('');
  const [pickerEnable, _pickerEnable] = useState<{ enable: boolean; display: boolean }>({
    enable: false,
    display: false,
  });
  const emojiPicker = useRef<HTMLDivElement>(null);
  const emojiInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const clickPickerHandler = (e: MouseEvent) => {
      if (emojiInput.current && emojiPicker.current) {
        if (emojiInput.current.contains(e.target as Node) || emojiPicker.current.contains(e.target as Node))
          _pickerEnable({ enable: true, display: true });
        else {
          _keywords('');
          _pickerEnable({ enable: true, display: false });
        }
      }
    };
    document.addEventListener('click', (e) => clickPickerHandler(e));
    return document.removeEventListener('click', (e) => clickPickerHandler(e));
  }, [pickerEnable.display]);
  return (
    <form method="post" className={styles.entire} onSubmit={async (e) => submit(e)}>
      <label>Title</label>
      <input type="text" name="title" value={meta.title} onChange={(e) => onChange(e)} placeholder="title" required />
      <label>Id / Slug</label>
      <input
        type="text"
        name="articleId"
        required
        autoComplete="off"
        value={meta.articleId}
        placeholder="id / slug"
        onChange={(e) => {
          idValidate(e.target);
          onChange(e);
        }}
      />
      <label>Emoji</label>
      <div className={`${styles.emoji} ${keywords.length < 1 && styles.enable}`}>
        <EmojiSvg unicode={encodeEmoji(meta.emoji)} />
        <input
          type="text"
          value={keywords}
          autoComplete="off"
          ref={emojiInput}
          className={`${pickerEnable.display && styles.enable}`}
          onChange={(e) => _keywords(e.target.value)}
          onFocus={() => _pickerEnable({ enable: true, display: true })}
        />
      </div>
      <div className={`${styles.picker} ${pickerEnable.display && styles.enable}`} ref={emojiPicker}>
        {pickerEnable.enable && (
          <EmojiPicker
            keywords={keywords}
            onSelect={(emoji) => {
              _keywords('');
              dispatch({ name: 'emoji', value: emoji });
              _pickerEnable({ enable: true, display: false });
            }}
          />
        )}
      </div>
      <label>Type</label>
      <label className={styles.check}>
        <input type="radio" name="type" value="tech" onChange={(e) => onChange(e)} checked={meta.type === 'tech'} />
        <span>Tech</span>
      </label>
      <label className={styles.check}>
        <input type="radio" name="type" value="idea" onChange={(e) => onChange(e)} checked={meta.type === 'idea'} />
        <span>Idea</span>
      </label>
      <label>Topics</label>
      <Topics topics={meta.topics} dispatch={(arg) => dispatch(arg)} />
      <label>Published</label>
      <label className={styles.check}>
        <input
          type="radio"
          name="published"
          value="true"
          onChange={(e) => onChange(e)}
          checked={meta.published === true}
        />
        <span>True</span>
      </label>
      <label className={styles.check}>
        <input
          type="radio"
          name="published"
          value="false"
          onChange={(e) => onChange(e)}
          checked={meta.published === false}
        />
        <span>False</span>
      </label>

      <label>Release Date</label>
      <input type="date" name="releaseDate" value={meta.releaseDate} onChange={(e) => onChange(e)} />

      <label>Update Date</label>
      <input type="date" name="updateDate" value={meta.updateDate} onChange={(e) => onChange(e)} />

      <input type="submit" name="save" value="Save" />

      <input type="submit" name="zenn" value="With Zenn" />

      <input type="submit" name="delete" value="Delete" />
    </form>
  );
}

export default memo(SideMenu);

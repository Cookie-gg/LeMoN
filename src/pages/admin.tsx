import Split from 'react-split';
import { HeadMeta, PageFrame } from 'components';
import pages from '../assets/scss/pages/Admin.module.scss';
import md from '../assets/scss/components/Markdown.module.scss';
import { useState } from 'react';
import axios from 'axios';

let timer: NodeJS.Timeout;

export default function Admin({ auth }: { auth: { state: boolean } }) {
  // const [formValue, _formValue, dispatch] = useForm({
  //   markdown: '',
  // });
  const [preview, _preview] = useState('');
  const [shortCut, _shortCut] = useState(false);
  return (
    <>
      <HeadMeta title="Admin" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Admin`} />
      <PageFrame classNmae={pages.entire}>
        <>
          <Split className={pages.split} gutterSize={7.5} minSize={400} snapOffset={0}>
            <div className={pages.editor} onClick={(el) => (el.currentTarget.children[0] as HTMLElement).focus()}>
              <div
                className={`${pages.inner}`}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onKeyDown={(e) => {
                  const el = e.target as HTMLDivElement;
                  // prevent to delete line number
                  _shortCut((prev) => {
                    if (e.ctrlKey && e.key === 'a') return true;
                    else if ((prev === true && e.key === 'Backspace') || e.key === 'x') return true;
                    else return false;
                  });
                  if (
                    (e.ctrlKey && e.key === 'Backspace' && el.children.length === 1) ||
                    (e.key === 'Backspace' && el.innerText.length < 2) ||
                    (shortCut && (e.key === 'Backspace' || e.key === 'x'))
                  ) {
                    el.innerHTML = '<div><br /></div>';
                    e.preventDefault();
                    _shortCut(false);
                  }
                  // clear timers have not completed
                  clearTimeout(timer);
                  // render html
                  timer = setTimeout(async () => {
                    _preview(
                      (
                        await axios.post(
                          `${process.env.NEXT_PUBLIC_MD}/json`,
                          { data: el.innerText },
                          { headers: { key: `${process.env.NEXT_PUBLIC_MD_KEY}` } },
                        )
                      ).data,
                    );
                  }, 750);
                }}
              >
                <div>
                  <br />
                </div>
              </div>
            </div>
            <div className={`${pages.preview} ${md.styles}`} dangerouslySetInnerHTML={{ __html: preview }} />
          </Split>
        </>
      </PageFrame>
    </>
  );
}

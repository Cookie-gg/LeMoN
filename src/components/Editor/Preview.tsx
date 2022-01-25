import { Scripts, Widgets } from 'widgets';
import { isText } from 'domhandler';
import { Mermaid } from 'components';
import type { MonacoEditorType } from 'types/common';
import parse, { domToReact, Element } from 'html-react-parser';
import { createElement, memo, useEffect, useRef } from 'react';
import markdwon from '../../assets/scss/components/Markdown.module.scss';
import styles from '../../assets/scss/components/editor/Preview.module.scss';

function Preview({ editor, html }: { editor: MonacoEditorType; html: string }) {
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editor && previewRef.current !== null) {
      editor.onDidScrollChange((e) => {
        previewRef.current?.scrollTo(0, e.scrollTop * ((previewRef.current?.scrollHeight + 1200) / e.scrollHeight));
      });
    }
  }, [editor]);
  return (
    <div
      ref={previewRef}
      className={`${styles.entire} ${markdwon.entire}`}
      onClick={(e) => {
        e;
      }}
    >
      <Scripts />
      {parse(html, {
        replace: (domNode) => {
          if (domNode instanceof Element) {
            if (domNode.attribs.class?.includes('link_widget') && domNode.children[0] instanceof Element) {
              return createElement(Widgets[domNode.attribs.title], {
                el: domNode.attribs.title?.includes('twitter') ? domNode : domNode.children[0],
              });
            } else if (
              domNode.attribs.class?.includes('mermaid') &&
              domNode.children[0] &&
              isText(domNode.children[0])
            ) {
              return <Mermaid chart={domNode.children[0].data} />;
            } else if (domNode.attribs.href?.match(/^#fn/)) {
              return <a>{domToReact(domNode.children)}</a>;
            }
          }
        },
      })}
    </div>
  );
}

export default memo(Preview);

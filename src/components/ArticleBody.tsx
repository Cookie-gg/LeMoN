import { Scripts, Widgets } from 'widgets';
import { useRouter } from 'utils/next';
import { ScrollerContext } from './MainFrame';
import parse, { Element } from 'html-react-parser';
import styles from '../assets/scss/components/ArticleBody.module.scss';
import markdwon from '../assets/scss/components/Markdown.module.scss';
import { createElement, createRef, memo, RefObject, useContext, useEffect, useRef } from 'react';
import { Mermaid } from 'components';
import { isText } from 'domhandler';
import Heading from './article/Heading';

interface PropsType {
  html: string;
  headingTexts?: string[];
  className?: string;
  _activeSection: (n: number) => void;
}

function ArticleBody({ html, _activeSection, headingTexts, className }: PropsType) {
  const id = `${useRouter().query.id}`;
  const scroller = useContext(ScrollerContext);
  const ref = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (headingTexts && el) {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.map(
            ({ isIntersecting, target: { textContent } }) =>
              isIntersecting && headingTexts.map((text, i) => text === textContent && _activeSection(i)),
          ),
        { root: scroller?.current, rootMargin: `0px 0px -95%`, threshold: 0 },
      );
      el.map((e) => e.current && observer.observe(e.current));
      return () => {
        el.map((e) => e.current && observer.unobserve(e.current));
        observer.disconnect();
      };
    }
  }, [id, headingTexts, _activeSection, scroller]);

  return (
    <>
      <div className={`${styles.inner} ${markdwon.entire} ${className}`}>
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
              } else if (domNode.name.match(/^h\d/)) {
                ref.current.push(createRef());
                const el = <Heading el={domNode} ref={ref.current[ref.current.length - 1]} />;
                return el;
              }
            }
          },
        })}
      </div>
    </>
  );
}

export default memo(ArticleBody, (prev, next) => prev.html === next.html);

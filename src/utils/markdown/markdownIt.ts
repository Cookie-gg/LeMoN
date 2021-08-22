import MarkdownIt from 'markdown-it';
import * as MarkdownItImsize from 'markdown-it-imsize';
import * as MarkdownItKatexx from 'markdown-it-katexx';
import * as MarkdownItContainer from 'markdown-it-container';
import * as MarkdownItSanitizer from 'markdown-it-sanitizer';
import * as MarkdownItLinkAttribute from 'markdown-it-link-attributes';
import * as MarkdownItNamedCodeBlocks from 'markdown-it-named-code-blocks';

const md = new MarkdownIt({
  linkify: false,
  html: true,
  breaks: true,
})
  .use(MarkdownItSanitizer)
  .use(MarkdownItImsize)
  .use(MarkdownItNamedCodeBlocks)
  .use(MarkdownItKatexx, { throwOnError: false, errorColor: ' #cc0000' })
  .use(MarkdownItContainer, 'details', {
    validate: function (params: string) {
      return params.trim().match(/^details\s+(.*)$/);
    },
    render: function (tokens: { info: string; nesting: number }[], idx: number) {
      const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return '<details><summary>' + md.utils.escapeHtml(m![1]) + '</summary>\n';
      } else {
        return '</details>\n';
      }
    },
  })
  .use(MarkdownItContainer, 'message', {
    validate(params: string) {
      if (params.trim().match(/^message/)) return params.trim().match(/^message/);
      else if (params.trim().match(/^message\s+(.*)$/)) return params.trim().match(/^message\s+(.*)$/);
    },
    render(tokens: { info: string; nesting: number }[], idx: number) {
      const m = tokens[idx].info.trim().match(/^message\s+(.*)$/);
      if (m) {
        if (tokens[idx].nesting === 1) {
          return `<div class='msg ${md.utils.escapeHtml(m![1])}'>`;
        } else {
          return '</div>\n';
        }
      } else {
        if (tokens[idx].nesting === 1) {
          return '<div class="msg">';
        } else {
          return '</div>\n';
        }
      }
    },
  })
  .use(MarkdownItLinkAttribute, { target: '_blank', rel: 'noopener' });

export default md;

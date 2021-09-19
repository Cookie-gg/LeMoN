import options from './prism';
import Prism from 'markdown-it-prism';
import md from 'utils/markdown/markdownIt';
import linkCard from 'utils/markdown/linkCard';

export default async function renderer(
  data: string,
): Promise<{ data: string; headings: { text: string; level: 1 | 2 }[] }> {
  md.use(Prism, options);
  const className = ['diff', 'coord', 'add', 'delete'];
  const open = `_${Math.random().toString(32).substring(2)}`;
  const close = `_${Math.random().toString(32).substring(2)}`;
  const lineByLine = data.split(/\r\n|\r|\n/);
  const links: string[] = [];
  const headings: { text: string; level: 1 | 2 }[] = [];
  data = md.render(
    lineByLine
      .map((value: string, i: number) => {
        // 注釈内のコードブロック対応
        if (value.includes('> ```')) {
          return `> ${open}_${value.replace('> ```', '')}_${close}`;
        }

        // diff コードブロック対応
        else if (value.indexOf('```diff') === 0 && !value.includes('>')) {
          if (lineByLine[i + 1].indexOf('@@') === 0)
            lineByLine[i + 1] = open + className[0] + open + className[1] + lineByLine[i + 1] + className[1] + close;
          return value.replace('diff ', '');
        } else if (value.indexOf('+    ') === 0) {
          return open + className[2] + value + className[2] + close;
        } else if (value.indexOf('-    ') === 0) {
          if (lineByLine[i + 1].indexOf('-    ') === 0) return open + className[3] + value + className[3] + close;
          else return open + className[3] + value + className[3] + close + className[0] + close;
        }

        // リンクカード対応
        else if (value.indexOf('https://') === 0 || value.indexOf('http://') === 0) {
          links.push(value);
          return value;
        }

        // 他
        else return value;
      })
      .join('\n'),
  );

  // diff コードブロック対応
  className.forEach((value: string) => {
    data = data.replaceAll(`${open}${value}`, `<span class="${value}">`);
    data = data.replaceAll(`${value}${close}`, `</span>`);
  });

  // 注釈内のコードブロック対応
  data = data.replaceAll(`${open}_`, '```');
  data = data.replaceAll(`_${close}`, '');

  // 見出しの抽出
  const h = data.match(/\<(h1|h2).*?\>(.*?)\<\/(h1|h2)\>/g);
  if (h) {
    h.forEach((heading) => {
      data = data.replaceAll(
        heading,
        `<h${heading.split('')[2] === '1' ? 1 : 2} id="${encodeURI(heading.replaceAll(/\<(.*?)\>/g, ''))}">${heading
          .replaceAll(/\<(h1|h2).*?\>/g, '')
          .replaceAll(/\<\/(h1|h2)\>/g, '')}</h${heading.split('')[2] === '1' ? 1 : 2}>`,
      );
    });
  }

  // リンクカード対応
  if (links.length > 0) data = await linkCard(data, links);

  return { data, headings };
}

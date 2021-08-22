import options from './prism';
import Prism from 'markdown-it-prism';
import md from 'utils/markdown/markdownIt';
import linkCard from 'utils/markdown/linkCard';

export default async function renderer(data: string): Promise<string> {
  md.use(Prism, options);
  const className = ['diff', 'coord', 'add', 'delete', 'annotation'];
  const open = `${Math.random().toString(32).substring(2)}`.replace(/[^0-9a-z]/gi, '');
  const close = `${Math.random().toString(32).substring(2)}`.replace(/[^0-9a-z]/gi, '');
  const lineByLine = data.split(/\r\n|\r|\n/);
  const links: string[] = [];
  const annotations: string[] = [];
  data = md.render(
    lineByLine
      .map((value: string, i: number) => {
        if (value.match(/\[\^\w\]/)) {
          const m = value.match(/\[\^\w\]/);
          if (lineByLine[i + 1] && lineByLine[i + 1].includes(m![0] + ': ')) {
            annotations.push(lineByLine[i + 1].replace(m![0] + ': ', ''));
            lineByLine.splice(i + 1, 1);
            return m?.input?.replace(m![0], '') + open + 'a' + m![0].replace('^', '') + 'a' + close;
          } else return value;
        } else if (value.includes('> ```')) {
          return `> ${open}_${value.replace('> ```', '')}_${close}`;
        } else if (value.indexOf('```diff') === 0 && !value.includes('>')) {
          if (lineByLine[i + 1].indexOf('@@') === 0)
            lineByLine[i + 1] = open + className[0] + open + className[1] + lineByLine[i + 1] + className[1] + close;
          return value.replace('diff ', '');
        } else if (value.indexOf('+    ') === 0) {
          return open + className[2] + value + className[2] + close;
        } else if (value.indexOf('-    ') === 0) {
          if (lineByLine[i + 1].indexOf('-    ') === 0) return open + className[3] + value + className[3] + close;
          else return open + className[3] + value + className[3] + close + className[0] + close;
        } else if (value.indexOf('https://') === 0 || value.indexOf('http://') === 0) {
          links.push(value);
          return value;
        } else return value;
      })
      .join('\n'),
  );
  className.forEach((value: string) => {
    data = data.replaceAll(`${open}${value}`, `<span class="${value}">`);
    data = data.replaceAll(`${value}${close}`, `</span>`);
  });
  annotations.forEach((value: string) => {
    data = data.replaceAll(`${open}a`, `<a title=${value} class="annotations">`);
    data = data.replaceAll(`a${close}`, `</a>`);
  });
  data = data.replaceAll(`${open}_`, '```');
  data = data.replaceAll(`_${close}`, '');
  if (links.length > 0) data = await linkCard(data, links);

  return data;
}

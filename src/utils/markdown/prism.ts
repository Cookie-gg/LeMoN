import Prismjs from 'prismjs';

let lv = 0;
const options = {
  plugins: ['custom-class'],
  init: (prism: typeof Prismjs) => {
    prism.plugins.customClass.add(({ content, type }: { content: string; type: string }) => {
      if (content === '(' || content === '[' || content === '{') {
        lv++;
        return lv % 3 === 1 ? 'yellow' : lv % 3 === 2 ? 'pink' : 'blue';
      } else if (content === ')' || content === ']' || content === '}') {
        lv--;
        return (lv + 1) % 3 === 1 ? 'yellow' : (lv + 1) % 3 === 2 ? 'pink' : 'blue';
      } else if (
        (content === 'export' || content === 'return' || content === 'async' || content === 'await') &&
        type === 'keyword'
      ) {
        return 'red';
      } else if (content === ';' || content === '.' || content === ',' || content === ':') {
        return 'white';
      } else if (content === '=>' && type === 'operator') {
        return 'blue';
      }
    });
  },
};

export default options;

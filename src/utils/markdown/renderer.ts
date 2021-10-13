import options from './prism';
import Prism from 'markdown-it-prism';
import md from 'utils/markdown/markdownIt';
import linkCard from 'utils/markdown/linkCard';

export default async function renderer(
  data: string,
): Promise<string> {
  md.use(Prism, options);
  const className = ['diff', 'coord', 'add', 'delete'];
  const open = `_${Math.random().toString(32).substring(2)}`;
  const close = `_${Math.random().toString(32).substring(2)}`;
  const lineByLine = data.split(/\r\n|\r|\n/);
  const links: string[] = [];
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

  return data;
}

// "\n# 見出し\n\n```\n# 見出し 1\n## 見出し 2\n### 見出し 3\n#### 見出し 4\n```\n\n# リスト\n\n```\n- Hello!\n- Hola!\n  - Bonjour!\n  * Hi!\n```\n\n- Hello!\n- Hola!\n  - Bonjour!\n  * Hi!\n\nリストのアイテムには`*`もしくは`-`を使います。\n\n## 番号付きリスト\n\n```\n1. First\n2. Second\n```\n\n1. First\n2. Second\n\n# テキストリンク\n\n```\n[アンカーテキスト](リンクのURL)\n```\n\n[アンカーテキスト](リンクのURL)\n\n# 画像\n\n```\n![altテキスト](https://画像のURL)\n```\n\n![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)\n\n## 画像の横幅を指定する\n\n画像の表示が大きすぎる場合は、`URL`の後に半角スペースを空けて`=〇〇x`と記述すると、画像の幅を`px`単位で指定できます。\n\n```\n![altテキスト](https://画像の URL =250x)\n```\n\n![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43 =250x)\n\n## キャプションをつける\n\n画像のすぐ下の行に`*`または`_`で挟んだテキストを配置すると、キャプションのような見た目で表示されます。\n\n```\n![](https://画像のURL)\n*キャプション*\n```\n\n![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43 =250x)\n_captions_\n\n## 画像にリンクを貼る\n\n```\n[![](https://画像のURL)](リンクのURL)\n```\n\n# テーブル\n\n```\n| Head | Head | Head |\n| ---- | ---- | ---- |\n| Text | Text | Text |\n| Text | Text | Text |\n```\n\n| Head | Head | Head |\n| ---- | ---- | ---- |\n| Text | Text | Text |\n| Text | Text | Text |\n\n# コードブロック\n\nコードは「```」で挟むことでブロックとして挿入できます。以下のように言語を指定するとコードへ装飾（シンタックスハイラト）が適用されます。\n\n> ```js\n>\n> ```\n\n```js\nconst great = () => {\n  console.log('Awesome');\n};\n```\n\nシンタックスハイライトには Prism.js を使用しています。\n\n[📄 対応言語の一覧 →](https://prismjs.com/#supported-languages/)\n\n> ```js:ファイル名\n>\n> ```\n\n```js:foobar.js\nconst great = () => {\n  console.log('Awesome');\n};\n```\n\n## `diff`のシンタックスハイライト\n\n> ```diff js\n>\n> ```\n\n```diff js\n@@ -4,6 +4,5 @@\n+    const foo = bar.baz([1, 2, 3]) + 1;\n-    let foo = bar.baz([1, 2, 3]);\n```\n\nなお、`diff`の使用時には、先頭に`+`、`-`、`半角スペース`のいずれが入っていない行はハイライトされません。\n同時にファイル名を指定することも可能です。\n\n# 数式\n\nZenn では**KaTeX による数式表示に対応しています。\n\n## 数式のブロックを挿入する\n\n`$$`で記述を挟むことで、数式のブロックが挿入されます。たとえば\n\n```\n$$\ne^{iΘ} = cosΘ + isinΘ\n$$\n```\n\nは以下のように表示されます。\n\n$$\ne^{iΘ} = cosΘ + isinΘ\n$$\n\n:::message\n`$$`の前後は空の行でないと正しく埋め込まれないことがあります。\n:::\n\n## インラインで数式を挿入する\n\n`$a eΘ$`というように`$`ひとつで挟むことで、インラインで数式を含めることっができます。\n\n# 引用\n\n```\n> 引用文\n> 引用文\n```\n\n> 引用文\n> 引用文\n\n# 注釈\n\n注釈を指定するとホバー可能になり、内容を確認できます。\n\n```\n脚注の例[^数字]です。\n[^数字]: 脚注の内容その 1\n```\n\n脚注の例[^1]です。\n[^1]: 脚注の内容その 1\n\n# 区切り線\n\n```\n---\n```\n\n---\n\n# インラインスタイル\n\n```\n*イタリック*\n**太字**\n~~打ち消し線~~\nインラインで`code`を挿入する\n```\n\n_イタリック_\n\n**太字**\n\n~~打ち消し線~~\n\nインラインで`code`を挿入する\n\n# インラインのコメント\n\n自分用のメモをしたいときは HTML のコメント記法を使用できます。\n\n```\n<!-- TODO: 〇〇について追記する -->\n```\n\nこの形式で書いたコメントは公開されたページ上では表示されません。ただし、複数行のコメントには対応していないのでご注意ください。\n\n# Zenn 独自の記法\n\n## メッセージ\n\n```\n:::message\nメッセージをここに\n:::\n```\n\n:::message\nメッセージをここに\n:::\n\n```\n:::message alert\n警告メッセージをここに\n:::\n```\n\n:::message alert\n警告メッセージをここに\n:::\n\n## アコーディオン（トグル）\n\n:::details タイトル\n表示したい内容\n:::\n\n:::details タイトル\n表示したい内容\n:::\n\n分かりづらいのですが「detail」ではなく「details」です。\n\n# コンテンツの埋め込み\n\n## リンクカード\n\n```\n# URLだけの行\nhttps://zenn.dev/zenn/articles/markdown-guide\n```\n\nURL だけが貼り付けられた行があると、その部分がカードとして表示されます。\n\nhttps://zenn.dev/zenn/articles/markdown-guide\n\n## 今後の課題\n\n- 注釈の改善\n- リンクカードの追加\n- card に対応\n  - GitHub Gist\n  - CodePen\n  - SlideShare\n  - SpeakerDeck\n  - JSFiddle\n  - CodeSandbox\n  - StackBlitz\n- ダイアグラム\n"
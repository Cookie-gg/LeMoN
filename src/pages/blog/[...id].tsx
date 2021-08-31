import { useMount, useWindowDimensions } from 'hooks';
import { Zenn, ZennAdds } from 'types/common';
import { useState } from 'react';
import pages from '../../assets/scss/pages/Blog.module.scss';
import { GetStaticPaths, GetStaticProps, Head } from 'utils/next';
import { ArticleMeta, PageFrame, ArticleToc, ArticleTopics, ArticleBody, Heading, ArticleList } from 'components';

const _data: {
  articles: (Zenn & ZennAdds)[];
} = {
  articles: [
    {
      id: 'zenn',
      releaseDate: new Date(2021, 8, 10),
      updateDate: new Date(2021, 8, 16),
      title: 'Next.jsでZennと自分のサイトで記事を同時投稿できるようにしてみた',
      emoji: '📝',
      type: 'tech',
      topics: ['Zenn', 'TypeScript'],
      icons: ['simple-icons:zenn', 'logos:typescript-icon', 'fa-solid:code'],
      body: '<h1>経緯</h1>\n<p>常々、自分のサイトにブログ機能をつけて、技術的なことを発信しようと考えていた。だが、せっかくなら最近勢いがあるエンジニアのための情報共有コミュニティのZennにも投稿し、多くの人に読んでいただきたい。そこでわざわざZennに投稿したものを自分のサイトに手動で入力するのも冗長である。ならば、自分のサイトで投稿したら同時にZennにも同じ記事が投稿されるようにしようということだ。</p>\n<h2>準備</h2>',
      relations: [
        {
          id: 'zenn',
          releaseDate: new Date(2020, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📘',
          type: 'tech',
          topics: ['Zenn'],
        },
        {
          id: 'zenn',
          releaseDate: new Date(2021, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📝',
          type: 'tech',
          topics: ['Zenn', 'TypeScript'],
        },
        {
          id: 'markdown-guide',
          releaseDate: new Date(2021, 9, 6),
          title: 'ZennのMarkdown記法一覧',
          emoji: '👩‍💻',
          type: 'tech',
          topics: ['Zenn', 'Markdown'],
        },
        {
          id: 'zenn',
          releaseDate: new Date(2021, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📘',
          type: 'tech',
          topics: ['Zenn'],
        },
      ],
    },
    {
      id: 'markdown-guide',
      releaseDate: new Date(2020, 9, 6),
      updateDate: new Date(2021, 9, 8),
      title: 'ZennのMarkdown記法一覧',
      emoji: '👩‍💻',
      type: 'tech',
      topics: ['Zenn', 'Markdown'],
      icons: ['simple-icons:zenn', 'fa-brands:markdown', 'fa-solid:code'],
      body: '<h1>見出し</h1>\n<pre><code># 見出し1\n## 見出し2\n### 見出し3\n### 見出し4\n</code></pre>\n<h1>リスト</h1>\n<pre><code>- Hello!\n- Hola!\n  - Bonjour!\n* Hi!\n</code></pre>\n<ul>\n<li>Hello!</li>\n<li>Hola!\n<ul>\n<li>Bonjour!</li>\n</ul>\n<ul>\n<li>Hi!</li>\n</ul>\n</li>\n</ul>\n<p>リストのアイテムには<code>*</code>もしくは<code>-</code>を使います。</p>\n<h3>番号付きリスト</h3>\n<pre><code>1. First\n2. Second\n</code></pre>\n<ol>\n<li>First</li>\n<li>Second</li>\n</ol>\n<h1>テキストリンク</h1>\n<pre><code>[アンカーテキスト](リンクのURL)\n</code></pre>\n<p><a href="リンクのURL">アンカーテキスト</a><br>\n<code>Ctrl + K</code>のショートカットでも挿入できます。</p>\n<h1>画像</h1>\n<pre><code>![altテキスト](htttps://画像のURL)\n</code></pre>\n<p><img src="https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43" alt="altテキスト"></p>\n<h3>画像の横幅を指定する</h3>\n<p>画像の表示が大きすぎる場合は、URL の後に半角スペースを空けて<code>=○○x</code>と記述すると、画像の幅を<code>px</code>単位で指定できます。</p>\n<pre><code>![altテキスト](https://画像のURL =250x)\n</code></pre>\n<p><img src="https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43" alt="altテキスト" width="250"></p>\n<h3>キャプションをつける</h3>\n<p>画像のすぐ下の行に<code>*</code>で挟んだテキストを配置すると、キャプションのような見た目で表示されます。</p>\n<pre><code>![](https://画像のURL)\n*キャプション*\n</code></pre>\n<p><img src="https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43" alt="altテキスト" width="250"><br>\n<em>captions</em></p>\n<h3>画像にリンクを張る</h3>\n<p>以下のようにすることで画像に対してリンクを貼ることもできます。</p>\n<pre><code>[![altテキスト](画像のURL)](リンクのURL)\n</code></pre>\n<h1>テーブル</h1>\n<pre><code>| Head | Head | Head |\n| ---- | ---- | ---- |\n| Text | Text | Text |\n| Text | Text | Text |\n</code></pre>\n<table>\n<thead>\n<tr>\n<th>Head</th>\n<th>Head</th>\n<th>Head</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Text</td>\n<td>Text</td>\n<td>Text</td>\n</tr>\n<tr>\n<td>Text</td>\n<td>Text</td>\n<td>Text</td>\n</tr>\n</tbody>\n</table>\n<h1>コードブロック</h1>\n<p>コードは「```」で挟むことでブロックとして挿入できます。以下のように言語を指定するとコードへ装飾（シンタックスハイライト）が適用されます。</p>\n<blockquote>\n<p>```js</p>\n<p>``` </p>\n</blockquote>\n<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">great</span> <span class="token operator">=</span> <span class="token punctuation yellow">(</span><span class="token punctuation yellow">)</span> <span class="token operator blue">=></span> <span class="token punctuation yellow">{</span>\n  console<span class="token punctuation white">.</span><span class="token function">log</span><span class="token punctuation pink">(</span><span class="token string">"Awesome"</span><span class="token punctuation pink">)</span><span class="token punctuation white">;</span>\n<span class="token punctuation yellow">}</span><span class="token punctuation white">;</span>\n</code></pre>\n<p>シンタックスハイライトには Prism.js を使用しています。<br>\n<a href="https://prismjs.com/#supported-languages/">📄 対応言語の一覧 →</a></p>\n<blockquote>\n<p>```js:ファイル名</p>\n<p>``` </p>\n</blockquote>\n<pre class="language-js named-fence-block"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">great</span> <span class="token operator">=</span> <span class="token punctuation yellow">(</span><span class="token punctuation yellow">)</span> <span class="token operator blue">=></span> <span class="token punctuation yellow">{</span>\n  console<span class="token punctuation white">.</span><span class="token function">log</span><span class="token punctuation pink">(</span><span class="token string">"Awesome"</span><span class="token punctuation pink">)</span><span class="token punctuation white">;</span>\n<span class="token punctuation yellow">}</span><span class="token punctuation white">;</span>\n</code><div class="named-fence-filename">fooBar.js</div></pre>\n<h3><code>diff</code>のシンタックスハイライト</h3>\n<blockquote>\n<p>```diff js</p>\n<p>```</p>\n</blockquote>\n<pre class="language-js"><code class="language-js"><span class="diff"><span class="coord">@@ <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation white">,</span><span class="token number">6</span> <span class="token operator">+</span><span class="token number">4</span><span class="token punctuation white">,</span><span class="token number">5</span> @@</span>\n<span class="add"><span class="token operator">+</span>    <span class="token keyword">const</span> foo <span class="token operator">=</span> bar<span class="token punctuation white">.</span><span class="token function">baz</span><span class="token punctuation yellow">(</span><span class="token punctuation pink">[</span><span class="token number">1</span><span class="token punctuation white">,</span> <span class="token number">2</span><span class="token punctuation white">,</span> <span class="token number">3</span><span class="token punctuation pink">]</span><span class="token punctuation yellow">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation white">;</span> </span>\n<span class="delete"><span class="token operator">-</span>    <span class="token keyword">let</span> foo <span class="token operator">=</span> bar<span class="token punctuation white">.</span><span class="token function">baz</span><span class="token punctuation yellow">(</span><span class="token punctuation pink">[</span><span class="token number">1</span><span class="token punctuation white">,</span> <span class="token number">2</span><span class="token punctuation white">,</span> <span class="token number">3</span><span class="token punctuation pink">]</span><span class="token punctuation yellow">)</span><span class="token punctuation white">;</span></span></span>\n</code></pre>\n<p>なお、diffの使用時には、先頭に<code>+</code>、<code>-</code>、<code>半角スペース</code>のいずれが入っていない行はハイライトされません。<br>\n同時にファイル名を指定することも可能です。</p>\n<h1>数式</h1>\n<p>Zenn では<strong>KaTeX</strong>による数式表示に対応しています。</p>\n<h3>数式のブロックを挿入する</h3>\n<p><code>$$</code>で記述を挟むことで、数式のブロックが挿入されます。たとえば</p>\n<pre><code>$$\ne^{iΘ} = cosΘ + isinΘ\n$$\n</code></pre>\n<p>は以下のように表示されます。</p>\n<span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>e</mi><mrow><mi>i</mi><mi mathvariant="normal">Θ</mi></mrow></msup><mo>=</mo><mi>c</mi><mi>o</mi><mi>s</mi><mi mathvariant="normal">Θ</mi><mo>+</mo><mi>i</mi><mi>s</mi><mi>i</mi><mi>n</mi><mi mathvariant="normal">Θ</mi></mrow><annotation encoding="application/x-tex">e^{iΘ} = cosΘ + isinΘ\n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8913309999999999em;vertical-align:0em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8913309999999999em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mord mtight">Θ</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.76666em;vertical-align:-0.08333em;"></span><span class="mord mathnormal">c</span><span class="mord mathnormal">o</span><span class="mord mathnormal">s</span><span class="mord">Θ</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222222222222222em;"></span></span><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathnormal">i</span><span class="mord mathnormal">s</span><span class="mord mathnormal">i</span><span class="mord mathnormal">n</span><span class="mord">Θ</span></span></span></span></span>\n<div class="msg"><p><code>$$</code>の前後は空の行でないと正しく埋め込まれないことがあります。</p>\n</div>\n<h3>インラインで数式を挿入する</h3>\n<p><code>$a e0$</code>というように<code>$</code>ひとつで挟むことで、インラインで数式を含めることができます。</p>\n<h1>引用</h1>\n<pre><code>&gt; 引用文\n&gt; 引用文\n</code></pre>\n<blockquote>\n<p>引用文<br>\n引用文</p>\n</blockquote>\n<h1>注釈</h1>\n<p>注釈を指定するとホバー可能になり、内容を確認できます。</p>\n<pre><code>脚注の例[^数字]です。\n[^数字]: 脚注の内容その1\n</code></pre>\n<p>脚注の例です。<a title=例です class="annotations">[1]</a></p>\n<h1>区切り線</h1>\n<pre><code>-----\n</code></pre>\n<hr>\n<pre><code>*イタリック*\n**太字**\n~~打ち消し線~~\nインラインで`code`を挿入する\n</code></pre>\n<p><em>イタリック</em><br>\n<strong>太字</strong><br>\n<s>打ち消し線</s><br>\nインラインで<code>code</code>を挿入する<br>\n#インラインのコメント</p>\n<pre><code>&lt;!-- TODO: ◯◯について追記する --&gt;\n</code></pre>\n<p>この形式で書いたコメントは公開されたページ上では表示されません。ただし、複数行のコメントには対応していないのでご注意ください。</p>\n<h1>Zenn 独自の記法</h1>\n<h3>メッセージ</h3>\n<pre><code>:::message\nメッセージをここに\n:::\n</code></pre>\n<div class="msg"><p>メッセージをここに</p>\n</div>\n<pre><code>:::message alert\n警告メッセージをここに\n:::\n</code></pre>\n<div class="msg alert"><p>警告メッセージをここに</p>\n</div>\n<p>アコーディオン（トグル）</p>\n<pre><code>:::details タイトル\n表示したい内容\n:::\n</code></pre>\n<details><summary>タイトル</summary>\n<p>表示したい内容</p>\n</details>\n<p>分かりづらいのですが「detail」ではなく「details」です。</p>\n<h1>コンテンツの埋め込み</h1>\n<pre><code># URLだけの行\nhttps://zenn.dev/zenn/articles/markdown-guide\n</code></pre>\n<p><code>URL</code>だけが貼り付けられた行があると、その部分がカードとして表示されます。</p>\n<div class="link_card"><a href="https://zenn.dev/zenn/articles/markdown-guide/" target="_blank" rel="noopener noreferrer"><div class="text_wrapper"><div class="title">ZennのMarkdown記法一覧</div><div class="description">Zenn公式さんによる記事</div><div class="domain"><img src="http://www.google.com/s2/favicons?domain=zenn.dev" alt="favicon" />zenn.dev</div></div><img src="https://storage.googleapis.com/zenn-user-upload/avatar/9965dabc76.jpeg"/ alt="ogp_image" /></a></div>\n<h2>今後の課題</h2>\n<ul>\n<li>注釈の改善</li>\n<li>リンクカードの追加</li>\n<li><a href="URL">card</a>に対応\n<ul>\n<li>GitHub Gist</li>\n<li>CodePen</li>\n<li>SlideShare</li>\n<li>SpeakerDeck</li>\n<li>JSFiddle</li>\n<li>CodeSandbox</li>\n<li>StackBlitz</li>\n</ul>\n</li>\n<li>ダイアグラム</li>\n</ul>\n',
      relations: [
        {
          id: 'zenn',
          releaseDate: new Date(2020, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📘',
          type: 'tech',
          topics: ['Zenn'],
        },
        {
          id: 'zenn',
          releaseDate: new Date(2021, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📝',
          type: 'tech',
          topics: ['Zenn', 'TypeScript'],
        },
        {
          id: 'markdown-guide',
          releaseDate: new Date(2021, 9, 6),
          title: 'ZennのMarkdown記法一覧',
          emoji: '👩‍💻',
          type: 'tech',
          topics: ['Zenn', 'Markdown'],
        },
        {
          id: 'zenn',
          releaseDate: new Date(2021, 8, 10),
          title: 'Zennと自分のサイトで記事を同時投稿できるようにしてみた',
          emoji: '📘',
          type: 'tech',
          topics: ['Zenn'],
        },
      ],
    },
  ],
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = _data.articles;
  const paths = data.map((value) => ({
    params: { id: [value.id] },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = _data.articles.find((value) => value.id === params!.id![0])!;
  // data.body = decodeURI(await renderer(data.body)); // case dev
  return { props: { data: JSON.stringify(data) } }; // case dev
  // return { props: { data: data } };
};

export default function Post({ data }: { data: Zenn & ZennAdds }) {
  data = JSON.parse(String(data)); // case dev

  const isMounted = useMount();
  const windowWidth = Number(useWindowDimensions().width);
  const [table, _table] = useState<{ tagName: string; text: string; height: number }[]>([]);
  return (
    <>
      <Head>
        <title>LeMoN | {data.title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css" />
      </Head>
      <PageFrame sectionClass={`${pages.post} ${isMounted && pages.mounted}`}>
        <>
          {
            <>
              <ArticleMeta
                type="main"
                emoji={data.emoji}
                title={data.title}
                releaseDate={data.releaseDate}
                updateDate={data.updateDate}
              />
              <div className={pages.contents}>
                <main style={{ width: `calc(100% - ${windowWidth > 1250 ? 400 : 0}px)` }}>
                  <ArticleBody body={data.body} _table={_table} />
                  <Heading rank={2} text="Related Articles" className={pages.heading} />
                  <ArticleList className={pages.relations} type="related" data={data.relations} />
                </main>
                {windowWidth > 1250 && (
                  <aside>
                    <ArticleTopics type={data.type} topics={data.topics} icons={data.icons} />
                    <ArticleToc table={table}>
                      <ArticleMeta
                        type="aside"
                        emoji={data.emoji}
                        title={data.title}
                        releaseDate={data.releaseDate}
                        updateDate={data.updateDate}
                      />
                    </ArticleToc>
                  </aside>
                )}
              </div>
            </>
          }
        </>
      </PageFrame>
    </>
  );
}

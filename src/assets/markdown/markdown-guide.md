# 見出し

```
# 見出し 1
## 見出し 2
### 見出し 3
#### 見出し 4
```

# リスト

```
- Hello!
- Hola!
  - Bonjour!
  * Hi!
```

- Hello!
- Hola!
  - Bonjour!
  * Hi!

リストのアイテムには`*`もしくは`-`を使います。

## 番号付きリスト

```
1. First
2. Second
```

1. First
2. Second

# テキストリンク

```
[アンカーテキスト](リンクのURL)
```

[アンカーテキスト](リンクのURL)

# 画像

```
![altテキスト](https://画像のURL)
```

![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43)

## 画像の横幅を指定する

画像の表示が大きすぎる場合は、`URL`の後に半角スペースを空けて`=〇〇x`と記述すると、画像の幅を`px`単位で指定できます。

```
![altテキスト](https://画像の URL =250x)
```

![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43 =250x)

## キャプションをつける

画像のすぐ下の行に`*`または`_`で挟んだテキストを配置すると、キャプションのような見た目で表示されます。

```
![](https://画像のURL)
*キャプション*
```

![altテキスト](https://storage.googleapis.com/zenn-user-upload/gxnwu3br83nsbqs873uibiy6fd43 =250x)
_captions_

## 画像にリンクを貼る

```
[![](https://画像のURL)](リンクのURL)
```

# テーブル

```
| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |
```

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

# コードブロック

コードは「```」で挟むことでブロックとして挿入できます。以下のように言語を指定するとコードへ装飾（シンタックスハイラト）が適用されます。

> ```js
>
> ```

```js
const great = () => {
  console.log("Awesome");
};
```

シンタックスハイライトには Prism.js を使用しています。

[📄 対応言語の一覧 →](https://prismjs.com/#supported-languages/)

> ```js:ファイル名
>
> ```

```js:foobar.js
const great = () => {
  console.log('Awesome');
};
```

## `diff`のシンタックスハイライト

> ```diff js
>
> ```

```diff js
@@ -4,6 +4,5 @@
+    const foo = bar.baz([1, 2, 3]) + 1;
-    let foo = bar.baz([1, 2, 3]);
```

なお、`diff`の使用時には、先頭に`+`、`-`、`半角スペース`のいずれが入っていない行はハイライトされません。
同時にファイル名を指定することも可能です。

# 数式

Zenn では\*\*KaTeX による数式表示に対応しています。

## 数式のブロックを挿入する

`$$`で記述を挟むことで、数式のブロックが挿入されます。たとえば

```
$$
e^{iΘ} = cosΘ + isinΘ
$$
```

は以下のように表示されます。

$$
e^{iΘ} = cosΘ + isinΘ
$$

:::message
`$$`の前後は空の行でないと正しく埋め込まれないことがあります。
:::

## インラインで数式を挿入する

`$a eΘ$`というように`$`ひとつで挟むことで、インラインで数式を含めることっができます。

# 引用

```
> 引用文
> 引用文
```

> 引用文
> 引用文

# 注釈

注釈を指定するとホバー可能になり、内容を確認できます。

```
脚注の例[^数字]です。
[^数字]: 脚注の内容その 1
```

脚注の例[^1]です。
[^1]: 脚注の内容その 1

# 区切り線

```
---
```

---

# インラインスタイル

```
*イタリック*
**太字**
~~打ち消し線~~
インラインで`code`を挿入する
```

_イタリック_

**太字**

~~打ち消し線~~

インラインで`code`を挿入する

# インラインのコメント

自分用のメモをしたいときは HTML のコメント記法を使用できます。

```
<!-- TODO: 〇〇について追記する -->
```

この形式で書いたコメントは公開されたページ上では表示されません。ただし、複数行のコメントには対応していないのでご注意ください。

# Zenn 独自の記法

## メッセージ

```
:::message
メッセージをここに
:::
```

:::message
メッセージをここに
:::

```
:::message alert
警告メッセージをここに
:::
```

:::message alert
警告メッセージをここに
:::

## アコーディオン（トグル）

```
:::details タイトル
表示したい内容
:::
```

:::details タイトル
表示したい内容
:::

分かりづらいのですが「detail」ではなく「details」です。

# コンテンツの埋め込み

## リンクカード

```
# URLだけの行
https://zenn.dev/zenn/articles/markdown-guide
```

URL だけが貼り付けられた行があると、その部分がカードとして表示されます。

https://zenn.dev/zenn/articles/markdown-guide

# 今後の課題

- 注釈の改善
- リンクカードの追加
- card に対応
  - GitHub Gist
  - CodePen
  - SlideShare
  - SpeakerDeck
  - JSFiddle
  - CodeSandbox
  - StackBlitz
- ダイアグラム

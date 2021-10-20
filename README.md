# d

# LeMoN
フロントエンジニア Cookie_ggのポートフォリオ及びホームページ

## フロント
https://github.com/Cookie-gg/LeMoN
## バックエンド
https://github.com/Cookie-gg/L_M_N
## 管理画面
https://github.com/Cookie-gg/NoMeL

## 構成
* フロントエンド
Next.js + Apollo + GraphQL
* バックエンド
NestJS + GraphQL + MongoDB
* 管理画面
Vue + Vite + Apollo + GraphQL


## セットアップ
開発用
```
npm i

npm run dev
```
ビルド
```
npm i

npm run build
```
GraphQL ジェネレート
```
npm i 

npm run generate
```

## ディレクトリ構成
```
── .
  │── .vscode
  │   └── setting.json (拡張機能設定、合わせると開発しやすい)
  │── src
  │   ├── assets
  │   │   ├── img (画像ファイル)
  │   │   └── scss (Scssファイル)
  │   │       ├── components (コンポーネントごとのScss)
  │   │       ├── foundation (リセットCSSや変数、mixinなど)
  │   │       └── pages (ページごとのScss)
  │   ├── components
  │   │   ├── components files...
  │   │   └── index.tsx (componentsのエントリーポイント)
  │   ├── data
  │   │   └── ...Query.tsx (データ加工のファイル)
  │   ├── graphQL
  │   │   ├── mutations (mutationsファイル群)
  │   │   ├── queries (queriesファイル群)
  │   │   └── config.gql.ts (apollo clientの設定)
  │   ├── hooks
  │   │   ├── hooks files...
  │   │   └── index.tsx (custom hooksのエントリーポイント)
  │   ├── pages
  │   │   ├── page files...
  │   │   ├── _app.tsc (pagesのエントリーポイント)
  │   │   └── index.tsx (/)
  │   ├── types
  │   │   ├── common.d.ts (よく使用する型)
  │   │   ├── global.d.ts (グローバル型)
  │   │   ├── graphql.d.ts (graphql-code-generatorで生成された型定義)
  │   │   └── modules.d.ts (型がないモジュールのための型)
  │   ├── utils
  │   │   ├── axios
  │   │   │   ├── get.axios.ts (GETリクエスト用の処理)
  │   │   │   └── post.axios.ts (POSTリクエスト用の処理)
  │   │   ├── firebase
  │   │   │   ├── auth.firebase.ts (firebaseの認証処理)
  │   │   │   ├── config.firebase.ts (firebaseの設定)
  │   │   │   ├── get.firebase.ts (firebaseのGETリクエスト処理)
  │   │   │   └── post.firebase.ts (firebaseのPOSTリクエスト処理)
  │   │   ├── github
  │   │   │   ├── config.github.ts (githubの設定)
  │   │   │   ├── get.github.ts (githubのGETリクエスト処理)
  │   │   │   └── post.github.ts (githubのPOSTリクエスト処理)
  │   │   ├── markdown
  │   │   │   ├── linkCard.ts (リンクカードの変換)
  │   │   │   ├── markdownIt.ts (markdownItの設定)
  │   │   │   ├── prism.ts (prismの設定)
  │   │   │   └── renderer.ts (markdownのレンダー)
  │   │   ├── common.ts (よく使用する関数)
  │   │   ├── next.ts (next/**のモジュールのエントリーポイント)
  │   │   └── prototype.ts (追加メソッド)
  │   └── index.tsx (エントリーポイント)
  ├── .env.development (開発用の環境変数)
  ├── .env.local (ローカルでの環境変数) ※gitignore対象
  ├── .env.production (納品用の環境変数)
  ├── .eslintrc.json (ESLintの設定)
  ├── .gitignore (git管理の設定)
  ├── .prettierrc.json (prettierの設定)
  ├── .codegen.yaml (graphql-code-generatorの設定ファイル)
  ├── graphql.schema.json (graphql-code-generatorで自動生成されたスキーマ)
  ├── next.config.js (next.jsの設定)
  ├── package-lock.json (パッケージの状態など)
  ├── package.json (プロジェクトの状態など)
  ├── README.md (現在位置)
  └── tsconfig.json (tsloaderの設定)
```

## 注意点

### コンポーネント構造について
* 基本的にコンポーネントの中身にコンポーネントは組み込まない
* pages > componentsという2層構造のみ

### パス指定について
* css modules(scss)の補完を効かせるには、相対パスで記述
```tsx
import component from "../../assets/scss/component.module.scss";
```
* その他は基本絶対パスで記述(baseURL: 'src')
* pagesやcomponentsのインポートはエントリーポイント(index.tsx)から
```tsx
import "assets/img/...";
import { Component } "components";
```

### スタイリングについて
* @extend は使わない
* page, componentsはCSS-modulesを有効にさせるため、[ファイル名].module.scssに
* CSS-modulesの使用の際、下記の拡張機能が必要(補完のため)

https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules


### ReduxやHooksについて
* HooksのuseContextでなるべく使用を避ける
* Hooks含め、全ての処理はpagesのみで行う、componentsにはpropsで渡す
* Hooks処理が長くなる場合はカスタムフックを作る
* useStateの記述方法は下記に則る
```tsx
import { useState } from 'react';

// Dispatch関数において、set = _ とする
const [variableName, _variableName] = useState<Types>(InitialState);
```

### リンター
* ESLint 
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Prettier
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

※ React.memoを使用の際、ESlintのDisplay Nameエラーが起こる。下記のように回避
```tsx 
import React from 'react';
function Component(Props: PropTypes) {
  return ...
}
export default React.memo(Component);
```
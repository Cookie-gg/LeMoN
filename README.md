# LeMoN
フロントエンジニア Cookie_ggのポートフォリオ及びホームページ

## フロント
https://github.com/Cookie-gg/LeMoN
## バックエンド及び管理画面
https://github.com/Cookie-gg/NoMeL

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
  │   ├── graphQL
  │   │   ├── mutations (mutationsファイル群)
  │   │   └── queries (queriesファイル群)
  │   ├── hooks
  │   │   ├── hooks files...
  │   │   └── index.tsx (custom hooksのエントリーポイント)
  │   ├── pages
  │   │   ├── pages files...
  │   │   ├── _app.tsc (pagesのエントリーポイント)
  │   │   └── index.tsx (/)
  │   ├── utils
  │   │   ├── api
  │   │   │   └── hello.ts (API)
  │   │   ├── axios
  │   │   │   ├── get.axios.ts (GETリクエスト用の処理)
  │   │   │   └── post.axios.ts (POSTリクエスト用の処理)
  │   │   ├── firebase
  │   │   │   ├── auth.firebase.ts (firebaseの認証処理)
  │   │   │   ├── config.firebase.ts (firebaseの設定)
  │   │   │   ├── get.firebase.ts (firebaseのGETリクエスト処理)
  │   │   │   └── post.firebase.ts (firebaseのPOSTリクエスト処理)
  │   │   ├── common.ts (よく使用する関数)
  │   │   └── next.ts (next/**のモジュールのエントリーポイント)
  │   │       
  │   │        
  │   └── index.tsx (エントリーポイント)
  ├── .env.development (開発用の環境変数)
  ├── .env.local (ローカルでの環境変数) ※gitignore対象
  ├── .env.production (納品用の環境変数)
  ├── .eslintrc.json (ESLintの設定)
  ├── .gitignore (git管理の設定)
  ├── .prettierrc.json (prettierの設定)
  ├── .next-env.d.ts (next.jsの型定義ファイル)
  ├── next.config.js (next.jsの設定)
  ├── package-lock.json (パッケージの状態など)
  ├── package.json (プロジェクトの状態など)
  ├── README.md (現在位置)
  └── tsconfig.json (tsloaderの設定)
```

## 注意点

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

### 環境変数について (.env.development, .env.production)
* REACT_APP_API_URL は API URL

### ReduxやHooksについて
* HooksのuseContextでなるべく使用を避ける
* Hooks含め、全ての処理はpagesのみで行う、componentsにはpropsで渡す
* Hooks処理が長くなる場合はカスタムフックを作る

### メモリリークについて
* 下記のエラーが出た上で正常に動くことがあっても、解消する
* 特にstate上でのsetIntervalやsetTimeOutの使用に注意する
```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

### Propsについて
* propsは基本、ファンクショナルコンポーネントの引数にオブジェクトとして取る
* キー指定はしない

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

### material icon について
* 拡張機能
https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme
* 設定
.vscode/setting.json
* 追加アイコン
https://drive.google.com/drive/folders/1Hw_zv6DD84WD9bDpe38HtIBfey867zaD?usp=sharing

## 追加modules
* axios (HTTP通信のため)
* firebase (認証及びデータベース使用のため)
* sass (Scss使用のため)
* sanitize-html (XSSの脆弱性対策)
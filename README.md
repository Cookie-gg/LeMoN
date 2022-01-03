# LeMoN

Cookie_gg's Portfolio and Blog

## Production

[![snapshot](/snapshot.png)](https://cookie-gg.vercel.app)

## Latest Preview

nothing

## Conmposition

|              | **[LeMoN](https://github.com/Cookie-gg/MeLoN)** | **[MeLoN](https://github.com/Cookie-gg/MeLoN)** |
| :----------: | :---------------------------------------------: | :---------------------------------------------: |
|     Role     |                    Front-end                    |                    Back-end                     |
| Conmposition |           Next.js + Apollo + GraphQL            |           NestJS + GraphQL + MongoDB            |

## Setups

Development

```
npm run dev
```

Development with [Vercel](https://vercel.com/)

```
npm i -g vercel
npm run vercel
```

Build

```
npm run build
```

Lint

```
npm run lint
```

Generate Grapqhl code

```
npm run generate
```

E2E test - Cypress

```
npm run cy:run
```

Open Cypress window

```
npm run cy:open
```

Storybook - Dev

```
npm run sb:dev
```

Storybook - build

```
npm run sb:build
```

## Directories

```
── .
  │── .github
  │   └── workflows
  │       └── cypress.yml
  │── .storybook
  │   ├── main.js
  │   └── preview.js
  │── .vscode
  │   └── setting.json
  │── cypress
  │   ├── downloads
  │   ├── integration
  │   ├── plugins
  │   └── support
  │── public
  │   └── ...static files
  │── src
  │   ├── assets
  │   │   ├── img
  │   │   └── scss
  │   │       ├── components
  │   │       ├── foundation
  │   │       └── pages
  │   ├── components
  │   │   ├── ...components files
  │   │   └── index.tsx
  │   ├── data
  │   │   └── ...Query.tsx
  │   ├── graphQL
  │   │   ├── mutations
  │   │   ├── queries
  │   │   └── config.gql.ts
  │   ├── hooks
  │   │   ├── ...hooks files
  │   │   └── index.tsx
  │   ├── pages
  │   │   ├── ...page files
  │   │   ├── _app.tsc
  │   │   └── index.tsx
  │   ├── types
  │   │   ├── common.d.ts
  │   │   ├── global.d.ts
  │   │   ├── graphql.d.ts
  │   │   └── modules.d.ts
  │   ├── utils
  │   │   ├── github
  │   │   │   ├── config.github.ts
  │   │   │   ├── get.github.ts
  │   │   │   └── post.github.ts
  │   │   ├── common.ts
  │   │   ├── next.ts
  │   │   └── prototype.ts
  │   └── index.tsx
  ├── .eslintrc.json
  ├── .gitignore
  ├── .prettierrc.json
  ├── .codegen.yaml
  ├── graphql.schema.json
  ├── next.config.js
  ├── package-lock.json
  ├── package.json
  ├── README.md
  └── tsconfig.json
```

## TO DO

- support mdx files

## Warnings

### Paths

- Css modules(scss) should be relative path on imports

```tsx
import component from '../../assets/scss/component.module.scss';
```

```tsx
import "assets/img/...";
import { Component } "components";
```

- imports of pages and components should be from entry points

### Stylings

- Don't use `@extend`
- Use vscode-css-modules of vscode extension to complement class name

https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules

### Hooks

- You can make custom hooks `src/hooks/...`
- Follow the writing style below

```tsx
import { useState } from 'react';

// set[dispatch name] = _[dispatch name]
const [variableName, _variableName] = useState<Types>(InitialState);
```

### Storybook

- Components should be refered from src/components
- When use next/router, config a route object on each files

```tsx
[Component Name].story = {
  parameters: {
    nextRouter: {
      pathname: '/lemon', // default: /
      asPath: '/lemon/cookie', // default: /
      query: { // default: {}
        id: 'cookie',
        // ... any queries
      },
    },
  },
};
```

- When use next/context, wrap a component with the context provider

```tsx
const store = {
  // initial values used on useContext
}
[Component Name].story = {
  decorators: [storyFn =>
    <Context.Provider value={store}>
      {storyFn()}
    </Context.Provider>
  ]
}
```

### Others

- ESLint
  https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- Prettier
  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

※ When you use `React.memo`, be careful warning of ESLink and write like below

```tsx
import React from 'react';
function Component(Props: PropTypes) {
  return ...
}
export default React.memo(Component);
```

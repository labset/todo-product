## typescript-monorepo

Monorepo template for TypeScript projects

### environment

- **[nvm](https://github.com/nvm-sh/nvm)** to manage node versions.

```bash
brew install nvm
```

- **[yarn](https://yarnpkg.com/)** as node package manager

```bash
brew install yarn
```

### development

- graphql codegen

```bash
yarn workspace @monorepo-graphql/schema codegen
```

- start environment

```bash
yarn workspace @monorepo/harness env:up
```

- start development server

```bash
yarn workspace @monorepo/harness start
```

- start frontend

```bash
yarn workspace @monorepo-frontend/app start
```

### house-keeping

- build it

```bash
yarn build
```

- format it

```bash
yarn format
```

- lint it

```bash
yarn lint
yarn lint --fix
```

- test it

```bash
yarn test
```

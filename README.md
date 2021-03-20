# ts-ast-utils

![build](https://github.com/proglang/ts-ast-utils/workflows/build/badge.svg)

A simpler & friendlier way to traverse the Typescript AST.

## TypeScript AST

Useful links regarding TypeScript AST:

- [TypeScript AST Viewer](https://ts-ast-viewer.com/): excellent tool for visualizing and understanding the AST. It will even provide you the code that generates the AST.
- [Using the Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)

## Install

1. Authenticate to Github Packages and add your token to your local `~/.npmrc` file by adding the following line. You can set up your token [here](https://github.com/settings/tokens). Make sure you select the scope `read:packages`.

```bash
//npm.pkg.github.com/:_authToken=TOKEN
```

2. Create or edit an `.npmrc` in your project's root directory and add the following line. This will indicate `npm` to fetch the packages from this registry.

```bash
@proglang:registry=https://npm.pkg.github.com
```

You can find more information about Github Packages [here](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages)

3. Finally, run `npm install` as with any other package:

```bash
$ npm install @proglang/ts-ast-utils
```

## Usage

```javascript
const tsAstUtils = require('@proglang/ts-ast-utils');
const ts = require('typescript');

const declarationFile = `
export function f(a: string, ...b: number[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = tsAstUtils.createFromString(declarationFile);

const tags = new Set();
tsAstUtils.accept(ast, {
  [ts.SyntaxKind.DotDotDotToken]: () => {
    tags.add('dot-dot-dot-token');
  },
  [ts.SyntaxKind.QuestionToken]: () => {
    tags.add('question-token');
  },
  [ts.SyntaxKind.ArrayType]: (node) => {
    tags.add('array');
    node.elementType.kind === ts.SyntaxKind.NumberKeyword && tags.add('array-number');
  },
});

console.log(`Tags: ${Array.from(tags).join(', ')}`);
```

Check out more examples [here](src/examples).

## API

### accept(node, visitor)

Easily traverse the AST starting from `node`. Define a `visitor` object that allows you to run syntax specific callbacks, `pre` and `post` conditions and define a `traverse` method to control how to traverse the AST.

#### node

Type: `ts.Node`

#### visitor

Type: `object`

##### Syntax specific callbacks

```javascript
tsAstUtils.accept(ast, {
  [ts.SyntaxKind.DotDotDotToken]: (node) => {
    // Callback will only be executed for `DotDotDotToken` nodes
  },
  [ts.SyntaxKind.QuestionToken]: (node) => {
    // ...
  },
  // ...
});
```

##### pre

Will be executed before visiting any node.

```javascript
// preorder traversal
accept(ast, {
  pre: (node) => {
    console.log(`${node.pos}:${node.end}:${node.kind}`);
  },
});
```

##### post

Will be executed after visiting any node.

```javascript
// postorder traversal
accept(ast, {
  post: (node) => {
    console.log(`${node.pos}:${node.end}:${node.kind}`);
  },
});
```

If desired, you can return a value in the `post()` callback. The return value on the last executed node will be the return value of `accept()`.

```javascript
// Computing the depth of an AST using the default traverse method.
const nodesDepth = new WeakMap();
const depth = accept(ast, {
  post: (node) => {
    const children = [];
    ts.forEachChild(node, (child) => {
      children.push(child);
    });

    if (children.length === 0) {
      // Node has not been visited yet
      nodesDepth.set(node, 1);
    } else {
      const childrenDepth = children.map((child) => +(nodesDepth.get(child) || 0));
      const nodeDepth = 1 + Math.max(...childrenDepth);
      nodesDepth.set(node, nodeDepth);
    }

    return nodesDepth.get(node) || 0;
  },
});
```

##### traverse

Define the traversal method.

Default: `ts.forEachChild()`

```javascript
// BFS traveral of an AST
const queue = [];
const bfsTraverse = (node, visit) => {
  const children = [];
  ts.forEachChild(node, (child) => {
    children.push(child);
  });

  children.forEach((c) => {
    queue.push(c);
  });

  const last = queue.shift();
  last && visit(last);
};

accept(ast, {
  pre: (node) => {
    console.log(`${node.pos}:${node.end}:${node.kind}`);
  },
  traverse: bfsTraverse,
});
```

### createFromString(fileContents)

#### fileContents

Type: `string`

```javascript
const declarationFile = `
export function f(a string): void;
`;

const ast = createFromString(declarationFile);
```

### emit(ast)

Prints an AST.

#### ast

Type: `ts.Node`

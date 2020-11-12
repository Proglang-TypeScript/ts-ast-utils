# ts-ast-utils

![build](https://github.com/proglang/ts-ast-utils/workflows/build/badge.svg)

A simpler & friendlier way to traverse the Typescript AST. Check out the examples [here](src/examples).

## TypeScript AST

Useful links regarding TypeScript AST:

- [TypeScript AST Viewer](https://ts-ast-viewer.com/): excellent tool for visualizing and understanding the AST. It will even provide you the code that generates the AST.
- [Using the Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)

## Usage

### accept()

Easily traverse the AST defining `pre`, `post` and syntax kind specific callbacks. For example, you can define a callback that will only be executed on interface declarations.

It lets you also define your own `traverse` function. By default, it will traverse the AST using `ts.forEachChild()` method.

### createFromString()

Easily creates an AST from a string.

### emit()

Print an AST.

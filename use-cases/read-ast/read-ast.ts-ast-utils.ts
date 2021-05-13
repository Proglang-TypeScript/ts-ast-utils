import * as tsAstUtils from '@proglang/ts-ast-utils';
import * as ts from 'typescript';

const fileName = `${__dirname}/file.d.ts`;

const ast = tsAstUtils.createFromFile(fileName);

tsAstUtils.accept(ast, {
  [ts.SyntaxKind.FunctionDeclaration]: (node) => {
    console.log(node.name && node.name.text);
  },
});

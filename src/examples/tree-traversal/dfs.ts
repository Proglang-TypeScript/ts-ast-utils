/* eslint-disable no-console */
import { accept, createFromString } from '../../index';
import ts from 'typescript';
import { getChildrenWithoutTokens } from '../../getChildrenWithoutTokens';

// Use https://ts-ast-viewer.com to check the AST.

const declarationFile = `
export function f(a string): void;
`;

const ast = createFromString(declarationFile);

const dfsTraverse = (node: ts.Node, visit: (n: ts.Node) => unknown) => {
  getChildrenWithoutTokens(node).forEach((c) => {
    visit(c);
  });
};

accept(ast, {
  pre: (node: ts.Node) => {
    console.log(`${node.pos}:${node.end}:${node.kind}`);
  },
  traverse: dfsTraverse,
});

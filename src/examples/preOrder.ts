/* eslint-disable no-console */
import { accept, createFromString } from '../index';
import ts from 'typescript';

// Use https://ts-ast-viewer.com to check the AST.

const declarationFile = `
export function f(): void;
`;

const ast = createFromString(declarationFile);

const depthVisitor = {
  pre: (node: ts.Node) => {
    console.log(`${node.pos}:${node.end}`);
  },
};

console.log(`Pre order:`);
accept(ast, depthVisitor);

import { accept, createFromString } from '../../index';
import ts from 'typescript';
import { getChildrenWithoutTokens } from '../../getChildrenWithoutTokens';

const declarationFile = `
export function f(): void;
`;

const ast = createFromString(declarationFile);

let numberOfNodes = 0;
accept(ast, {
  pre: () => {
    numberOfNodes++;
  },
  traverse: (node: ts.Node, visit: (node: ts.Node) => unknown) => {
    getChildrenWithoutTokens(node).forEach(visit);
  },
});

// eslint-disable-next-line no-console
console.log(`Number of nodes: ${numberOfNodes}`);

numberOfNodes = 0;
accept(ast, {
  pre: () => {
    numberOfNodes++;
  },
  traverse: (node: ts.Node, visit: (node: ts.Node) => unknown) => {
    node.getChildren().forEach(visit);
  },
});

// eslint-disable-next-line no-console
console.log(`Number of nodes: ${numberOfNodes}`);

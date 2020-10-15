import { visitAllChildren, createFromString } from '../index';

const declarationFile = `
export function foo(a: string): number;
export function bar(b: string): number;
`;

const ast = createFromString(declarationFile);

let numberOfNodes = 0;
visitAllChildren(ast, {
  all: () => {
    numberOfNodes++;
  },
});

console.log(`Number of nodes: ${numberOfNodes}`);

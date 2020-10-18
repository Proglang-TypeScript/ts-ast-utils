import { accept, createFromString } from '../index';

const declarationFile = `
export function foo(a: string): number;
export function bar(b: string): number;
`;

const ast = createFromString(declarationFile);

let numberOfNodes = 0;
accept(ast, {
  pre: () => {
    numberOfNodes++;
  },
});

// eslint-disable-next-line no-console
console.log(`Number of nodes: ${numberOfNodes}`);

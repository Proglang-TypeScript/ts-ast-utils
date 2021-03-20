import { accept, createFromString } from '../../index';
import ts from 'typescript';

const declarationFile = `
export function f(a: string, ...b: number[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = createFromString(declarationFile);

const nodesDepth = new WeakMap<ts.Node, number>();
const depth = accept(ast, {
  post: (node: ts.Node) => {
    const children: ts.Node[] = [];
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

// eslint-disable-next-line no-console
console.log(`The depth of the AST is: ${depth}`);

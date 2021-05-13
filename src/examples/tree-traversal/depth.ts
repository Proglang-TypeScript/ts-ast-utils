import { accept, createFromString } from '../../index';
import ts from 'typescript';

const declarationFile = `
export function f(a: string, ...b: (string | number)[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = createFromString(declarationFile);

const depthVisitor = {
  nodesDepth: new WeakMap<ts.Node, number>(),
  depth: 0,
  traverse: function (node: ts.Node, visit: (n: ts.Node) => unknown) {
    const depthNode = this.nodesDepth.get(node) || 0;

    this.depth = Math.max(this.depth, depthNode);

    ts.forEachChild(node, (child: ts.Node) => {
      this.nodesDepth.set(child, depthNode + 1);
      visit(child);
    });
  },
};

accept(ast, depthVisitor);

// eslint-disable-next-line no-console
console.log(`The depth of the AST is: ${depthVisitor.depth}`);

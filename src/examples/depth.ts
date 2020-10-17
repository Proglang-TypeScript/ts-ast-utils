import { visit, createFromString } from '../index';
import ts from 'typescript';

const declarationFile = `
export function f(a: string, ...b: number[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = createFromString(declarationFile);

const depthVisitor = {
  post: (node: ts.Node) => {
    const children = node.getChildren();
    if (children.length === 0) {
      return 1;
    }

    const depthsOfChildren = children.map((child) => +(visit(child, depthVisitor) as number));

    return 1 + Math.max(...depthsOfChildren);
  },
  traverse: () => undefined,
};

const depth = visit(ast, depthVisitor);

// eslint-disable-next-line no-console
console.log(`The depth of the AST is: ${depth}`);

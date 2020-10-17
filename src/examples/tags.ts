import { visitAllChildren, createFromString } from '../index';
import ts from 'typescript';

const declarationFile = `
export function f(a: string, ...b: number[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = createFromString(declarationFile);

const tags = new Set<string>();
visitAllChildren(ast, {
  [ts.SyntaxKind.DotDotDotToken]: () => {
    tags.add('dot-dot-dot-token');
  },
  [ts.SyntaxKind.QuestionToken]: () => {
    tags.add('question-token');
  },
  [ts.SyntaxKind.ArrayType]: (node: ts.Node) => {
    tags.add('array');
    (node as ts.ArrayTypeNode).elementType.kind === ts.SyntaxKind.NumberKeyword &&
      tags.add('array-number');
  },
});

// eslint-disable-next-line no-console
console.log(`Tags: ${Array.from(tags).join(', ')}`);

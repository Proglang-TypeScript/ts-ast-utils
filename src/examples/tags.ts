import { visit, createFromString } from '../index';
import ts from 'typescript';

const declarationFile = `
export function f(a: string, ...b: number[]): void;

export interface Foo {
    a?: string;
}
`;

const ast = createFromString(declarationFile);

const tags = new Set<string>();
visit(ast, {
  [ts.SyntaxKind.DotDotDotToken]: () => {
    tags.add('dot-dot-dot-token');
  },
  [ts.SyntaxKind.QuestionToken]: () => {
    tags.add('question-token');
  },
  [ts.SyntaxKind.ArrayType]: (node) => {
    tags.add('array');
    node.elementType.kind === ts.SyntaxKind.NumberKeyword && tags.add('array-number');
  },
});

// eslint-disable-next-line no-console
console.log(`Tags: ${Array.from(tags).join(', ')}`);

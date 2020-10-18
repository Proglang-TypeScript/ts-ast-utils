import { createFromString } from '../createFromString';
import { accept } from '../accept';
import ts from 'typescript';
import { Visitor } from '../accept/types';

describe('visitAllChildren', () => {
  it('Runs the visitor on all children', () => {
    const ast = createFromString('export function foo(a: string): number;');

    let nodes = 0;
    const visitor: Visitor = {
      pre: () => {
        nodes++;
      },
    };

    accept(ast, visitor);

    expect(nodes).toBe(9);
  });

  it('Runs the visitor on a specific syntax kind', () => {
    const ast = createFromString('export function foo(a: string): number;');

    const tags = new Set<string>();
    const visitor: Visitor = {
      [ts.SyntaxKind.StringKeyword]: () => {
        tags.add('string');
      },
    };

    accept(ast, visitor);

    expect(tags.has('string')).toBe(true);
  });
});

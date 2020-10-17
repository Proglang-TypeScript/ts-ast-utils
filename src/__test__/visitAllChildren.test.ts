import { createFromString } from '../createFromString';
import { visit } from '../visitAllChildren';
import ts from 'typescript';
import { Visitor } from '../visitAllChildren/types';

describe('visitAllChildren', () => {
  it('Runs the visitor on all children', () => {
    const ast = createFromString('export function foo(a: string): number;');

    let nodes = 0;
    const visitorsMap: Visitor = {
      pre: () => {
        nodes++;
      },
    };

    visit(ast, visitorsMap);

    expect(nodes).toBe(9);
  });

  it('Runs the visitor on a specific syntax kind', () => {
    const ast = createFromString('export function foo(a: string): number;');

    const tags = new Set<string>();
    const visitorsMap: Visitor = {
      [ts.SyntaxKind.StringKeyword]: () => {
        tags.add('string');
      },
    };

    visit(ast, visitorsMap);

    expect(tags.has('string')).toBe(true);
  });
});

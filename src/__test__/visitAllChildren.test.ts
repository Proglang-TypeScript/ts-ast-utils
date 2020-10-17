import { createFromString } from '../createFromString';
import { visitAllChildren } from '../visitAllChildren';
import ts from 'typescript';
import { VisitorsMap } from '../visitAllChildren/types';

describe('visitAllChildren', () => {
  it('Runs the visitor on all children', () => {
    const ast = createFromString('export function foo(a: string): number;');

    let nodes = 0;
    const visitorsMap: VisitorsMap = {
      all: () => {
        nodes++;
      },
    };

    visitAllChildren(ast, visitorsMap);

    expect(nodes).toBe(8);
  });

  it('Runs the visitor on a specific syntax kind', () => {
    const ast = createFromString('export function foo(a: string): number;');

    const tags = new Set<string>();
    const visitorsMap: VisitorsMap = {
      [ts.SyntaxKind.StringKeyword]: () => {
        tags.add('string');
      },
    };

    visitAllChildren(ast, visitorsMap);

    expect(tags.has('string')).toBe(true);
  });
});

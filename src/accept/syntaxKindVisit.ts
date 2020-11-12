import ts from 'typescript';
import { SyntaxKindResult, Visitor } from './types';

export const syntaxKindVisit = (node: ts.Node, visitor: Visitor) => {
  const syntaxKindVisitFn = visitor[node.kind];

  return parseSyntaxKindResult(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (syntaxKindVisitFn && syntaxKindVisitFn(node as any)) || {},
  );
};

const parseSyntaxKindResult = (result: SyntaxKindResult): Required<SyntaxKindResult> => ({
  post: result.post ?? true,
  traverse: result.traverse ?? true,
});

import ts from 'typescript';
import { SyntaxKindResult, Visitor } from './types';

export const syntaxKindVisit = (node: ts.Node, visitor: Visitor) => {
  const result = runSyntaxKindVisit(node, visitor);
  return parseSyntaxKindResult(result);
};

const parseSyntaxKindResult = (result: SyntaxKindResult): Required<SyntaxKindResult> => ({
  post: result.post ?? true,
  traverse: result.traverse ?? true,
});

const specificVisitIsDefined = (
  visitor: Visitor,
  kind: ts.SyntaxKind,
): visitor is Required<Pick<Visitor, typeof kind>> => {
  return kind in visitor;
};

const runSyntaxKindVisit = (node: ts.Node, visitor: Visitor): SyntaxKindResult => {
  if (!specificVisitIsDefined(visitor, node.kind)) {
    return {};
  }

  switch (node.kind) {
    case ts.SyntaxKind.InterfaceDeclaration:
      return (ts.isInterfaceDeclaration(node) && visitor[node.kind](node)) || {};

    case ts.SyntaxKind.ArrayType:
      return (ts.isArrayTypeNode(node) && visitor[node.kind](node)) || {};

    default:
      return visitor[node.kind](node) || {};
  }
};

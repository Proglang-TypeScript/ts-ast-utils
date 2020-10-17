import ts from 'typescript';
import { VisitorsMap } from './types';

export function visitAllChildren(rootNode: ts.Node, visitors: VisitorsMap) {
  ts.forEachChild(rootNode, getVisitor(visitors));
}

const getVisitor = (visitors: VisitorsMap) => {
  const visit = (node: ts.Node) => {
    const allNodesVisitor = visitors.all;
    allNodesVisitor && allNodesVisitor(node);

    if (ts.isInterfaceDeclaration(node)) {
      node;
    }

    const syntaxKindVisitor = visitors[node.kind];
    syntaxKindVisitor && syntaxKindVisitor(node as any);

    ts.forEachChild(node, visit);
  };

  return visit;
};

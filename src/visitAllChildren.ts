import ts from 'typescript';

export type VisitorFunction = (node: ts.Node) => unknown;
export type VisitorsMap = {
  [k in ts.SyntaxKind]?: VisitorFunction;
} & {
  all?: VisitorFunction;
};

export function visitAllChildren(rootNode: ts.Node, visitors: VisitorsMap) {
  ts.forEachChild(rootNode, getVisitor(visitors));
}

const getVisitor = (visitors: VisitorsMap) => {
  const visit = (node: ts.Node) => {
    const allNodesVisitor = visitors.all;
    allNodesVisitor && allNodesVisitor(node);

    const syntaxKindVisitor = visitors[node.kind];
    syntaxKindVisitor && syntaxKindVisitor(node);

    ts.forEachChild(node, visit);
  };

  return visit;
};

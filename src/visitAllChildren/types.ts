import ts from 'typescript';

export type VisitorFunction<N extends ts.Node = ts.Node> = (node: N) => unknown;

export type VisitorsMap = VisitorsWithSpecificNodeTypes &
  VisitorsWithGenericNodeType &
  VisitorsAllNodes;

type VisitorsAllNodes = {
  all?: VisitorFunction;
};

type VisitorsWithGenericNodeType = {
  [k in Exclude<ts.SyntaxKind, keyof VisitorsWithSpecificNodeTypes>]?: VisitorFunction;
};

type VisitorsWithSpecificNodeTypes = {
  [ts.SyntaxKind.InterfaceDeclaration]?: VisitorFunction<ts.InterfaceDeclaration>;
  [ts.SyntaxKind.ArrayType]?: VisitorFunction<ts.ArrayTypeNode>;
};

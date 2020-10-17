import ts from 'typescript';

export type VisitorFunction = (node: ts.Node) => unknown;

export type VisitSyntaxKindFunction<N extends ts.Node = ts.Node> = (
  node: N,
) => {
  post?: boolean;
  traverse?: boolean;
} | void;

export type Visitor = VisitorWithSpecificNodeTypes & VisitorWithGenericNodeType & VisitorAllNodes;

type VisitorAllNodes = {
  pre?: VisitorFunction;
  post?: VisitorFunction;
  traverse?: (rootNode: ts.Node, visit: (node: ts.Node) => unknown) => void;
};

type VisitorWithGenericNodeType = {
  [k in Exclude<ts.SyntaxKind, keyof VisitorWithSpecificNodeTypes>]?: VisitSyntaxKindFunction;
};

type VisitorWithSpecificNodeTypes = {
  [ts.SyntaxKind.InterfaceDeclaration]?: VisitSyntaxKindFunction<ts.InterfaceDeclaration>;
  [ts.SyntaxKind.ArrayType]?: VisitSyntaxKindFunction<ts.ArrayTypeNode>;
};

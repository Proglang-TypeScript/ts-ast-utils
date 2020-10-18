import ts from 'typescript';

export type VisitorFunction = (node: ts.Node) => unknown;
export type VisitorPostFunction<R = unknown> = (node: ts.Node) => R;

export type SyntaxKindResult = {
  post?: boolean;
  traverse?: boolean;
};

export type VisitSyntaxKindFunction<N extends ts.Node = ts.Node> = (
  node: N,
) => SyntaxKindResult | void;

export type Visitor<R = unknown> = VisitorWithSpecificNodeTypes &
  VisitorWithGenericNodeType &
  VisitorAllNodes<R>;

type VisitorAllNodes<R = unknown> = {
  pre?: VisitorFunction;
  post?: VisitorPostFunction<R>;
  traverse?: (rootNode: ts.Node, visit: (node: ts.Node) => unknown) => void;
};

type VisitorWithGenericNodeType = {
  [k in Exclude<ts.SyntaxKind, keyof VisitorWithSpecificNodeTypes>]?: VisitSyntaxKindFunction;
};

type VisitorWithSpecificNodeTypes = {
  [ts.SyntaxKind.InterfaceDeclaration]?: VisitSyntaxKindFunction<ts.InterfaceDeclaration>;
  [ts.SyntaxKind.ArrayType]?: VisitSyntaxKindFunction<ts.ArrayTypeNode>;
};

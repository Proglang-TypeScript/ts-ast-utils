import ts from 'typescript';

export type VisitorPreFunction = (node: ts.Node) => unknown;
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
  pre?: VisitorPreFunction;
  post?: VisitorPostFunction<R>;
  traverse?: (rootNode: ts.Node, visit: (node: ts.Node) => unknown) => void;
};

type VisitorWithGenericNodeType = {
  [k in Exclude<ts.SyntaxKind, keyof VisitorWithSpecificNodeTypes>]?: VisitSyntaxKindFunction;
};

type VisitorWithSpecificNodeTypes = {
  [ts.SyntaxKind.InterfaceDeclaration]?: VisitSyntaxKindFunction<InterfaceDeclaration>;
  [ts.SyntaxKind.ArrayType]?: VisitSyntaxKindFunction<ts.ArrayTypeNode>;
  [ts.SyntaxKind.FunctionDeclaration]?: VisitSyntaxKindFunction<ts.FunctionDeclaration>;
  [ts.SyntaxKind.ClassDeclaration]?: VisitSyntaxKindFunction<ClassDeclaration>;
};

interface InterfaceDeclaration extends Omit<ts.InterfaceDeclaration, 'members'> {
  members: (
    | ts.PropertySignature
    | ts.MethodSignature
    | ts.CallSignatureDeclaration
    | ts.ConstructSignatureDeclaration
    | ts.IndexSignatureDeclaration
  )[];
}

interface ClassDeclaration extends Omit<ts.ClassDeclaration, 'members'> {
  members: (ts.PropertyDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration)[];
}

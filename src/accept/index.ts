import ts from 'typescript';
import { Visitor, SyntaxKindResult } from './types';

export function accept<R = unknown>(node: ts.Node, visitor: Visitor<R>): R | undefined {
  return visitWithVisitor<R>(visitor)(node);
}

const visitWithVisitor = <R = unknown>(visitor: Visitor<R>) => {
  const visit = (node: ts.Node) => {
    const preVisit = visitor.pre;
    preVisit && preVisit(node);

    const syntaxKindVisit = visitor[node.kind];
    const syntaxKindVisitResult = parseSyntaxKindResult(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (syntaxKindVisit && syntaxKindVisit(node as any)) || {},
    );

    if (syntaxKindVisitResult.traverse === true) {
      const traverseFn = visitor.traverse || defaultTraverse;
      traverseFn(node, visit);
    }

    let resultPost;
    if (syntaxKindVisitResult.post === true) {
      const postVisit = visitor.post;
      resultPost = postVisit && postVisit(node);
    }

    return resultPost;
  };

  return visit;
};

const defaultTraverse = (node: ts.Node, visit: (node: ts.Node) => unknown) => {
  ts.forEachChild(node, visit);
};

const parseSyntaxKindResult = (result: SyntaxKindResult) => ({
  post: result.post ?? true,
  traverse: result.traverse ?? true,
});

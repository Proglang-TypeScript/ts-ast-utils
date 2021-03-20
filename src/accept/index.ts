import ts from 'typescript';
import { syntaxKindVisit } from './syntaxKindVisit';
import { Visitor } from './types';

export function accept<R = unknown>(node: ts.Node, visitor: Visitor<R>): R | undefined {
  return visitWithVisitor<R>(visitor)(node);
}

const visitWithVisitor = <R = unknown>(visitor: Visitor<R>) => {
  const visit = (node: ts.Node) => {
    const preVisit = visitor.pre;
    preVisit && preVisit(node);

    const syntaxKindVisitResult = syntaxKindVisit(node, visitor);

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
  ts.forEachChild(node, (node: ts.Node) => {
    // Avoid forwarding `visit` return value, as `ts.forEachChild()` stops
    // iteration for a truthy value.
    visit(node);
  });
};

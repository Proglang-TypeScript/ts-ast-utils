import ts from 'typescript';
import { Visitor } from './types';

export function visit(node: ts.Node, visitor: Visitor): unknown {
  return visitWithVisitor(visitor)(node);
}

const visitWithVisitor = (visitor: Visitor) => {
  const visit = (node: ts.Node) => {
    const preVisit = visitor.pre;
    preVisit && preVisit(node);

    const syntaxKindVisit = visitor[node.kind];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const syntaxKindVisitResult = (syntaxKindVisit && syntaxKindVisit(node as any)) || {};
    syntaxKindVisitResult.post = syntaxKindVisitResult.post ?? true;
    syntaxKindVisitResult.traverse = syntaxKindVisitResult.traverse ?? true;

    if (syntaxKindVisitResult.traverse === true) {
      const traverseFn = visitor.traverse || defaultTraverse;
      traverseFn(node, visit);
    }

    let resultPost: unknown;
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

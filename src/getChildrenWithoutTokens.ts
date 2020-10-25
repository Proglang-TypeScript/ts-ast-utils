import ts from 'typescript';

export const getChildrenWithoutTokens = (node: ts.Node) => {
  const children: ts.Node[] = [];

  ts.forEachChild(node, (child) => {
    children.push(child);
  });

  return children;
};

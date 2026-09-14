/* eslint-disable no-console */
import { createFromString } from '../index';
import ts from 'typescript';
import { emit } from '../emit';

const declarationFile = `
export interface Foo {
    foo: string;
    foobar: number;
}

export interface Bar {
    bar: string;
}

export interface Baz {
    baz: string;
}
`;

const ast = createFromString(declarationFile);

console.log('Original interface:');
console.log(emit(ast));

const result = ts.transform(ast, [
  (context) => (source) => {
    const visit: ts.Visitor = (node) => {
      if (ts.isPropertySignature(node))
        return ts.factory.updatePropertySignature(
          node,
          node.modifiers,
          node.name,
          ts.factory.createToken(ts.SyntaxKind.QuestionToken),
          node.type,
        );
      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitEachChild(source, visit, context);
  },
]);

console.log('--------------');

console.log('Modified interface:');
console.log(emit(result.transformed[0]));
result.dispose();

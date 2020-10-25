/* eslint-disable no-console */
import { accept, createFromString } from '../index';
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

accept(ast, {
  [ts.SyntaxKind.InterfaceDeclaration]: (interfaceDeclaration) => {
    interfaceDeclaration.members.forEach((m) => {
      m.questionToken = ts.createToken(ts.SyntaxKind.QuestionToken);
    });

    return { traverse: false };
  },
});

console.log('--------------');

console.log('Modified interface:');
console.log(emit(ast));

import { accept, createFromString } from '../index';
import ts from 'typescript';

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

const interfaces: { name: string; members: string[] }[] = [];
accept(ast, {
  [ts.SyntaxKind.InterfaceDeclaration]: (interfaceDeclaration) => {
    interfaces.push({
      name: interfaceDeclaration.name.escapedText.toString(),
      members: interfaceDeclaration.members.map((m) => m.name?.getText() || ''),
    });

    return { traverse: false };
  },
});

// eslint-disable-next-line no-console
console.log(
  `Declared interfaces: ${interfaces
    .map((i) => `${i.name}: [${i.members.join(', ')}]`)
    .join(', ')}`,
);

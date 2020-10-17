import { visitAllChildren, createFromString } from '../index';
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
visitAllChildren(ast, {
  [ts.SyntaxKind.InterfaceDeclaration]: (node: ts.Node) => {
    const interfaceDeclaration = node as ts.InterfaceDeclaration;

    interfaces.push({
      name: interfaceDeclaration.name.escapedText.toString(),
      members: interfaceDeclaration.members.map((m) =>
        (m.name as ts.Identifier).escapedText.toString(),
      ),
    });
  },
});

// eslint-disable-next-line no-console
console.log(
  `Declared interfaces: ${interfaces
    .map((i) => `${i.name}: [${i.members.join(', ')}]`)
    .join(', ')}`,
);

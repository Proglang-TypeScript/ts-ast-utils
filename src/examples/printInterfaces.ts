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

export interface WithMethods {
    myMethod(a: string): number;
}
`;

const ast = createFromString(declarationFile);

const interfaces: { name: string; properties: string[]; methods: string[] }[] = [];
accept(ast, {
  [ts.SyntaxKind.InterfaceDeclaration]: (interfaceDeclaration) => {
    const properties: string[] = [];
    const methods: string[] = [];
    interfaceDeclaration.members.map((member) => {
      switch (member.kind) {
        case ts.SyntaxKind.PropertySignature:
          const property = member;
          properties.push(property.name?.getText() || '');
          break;

        case ts.SyntaxKind.MethodSignature:
          const method = member as ts.MethodSignature;
          methods.push(method.name?.getText() || '');
          break;
      }
    });

    interfaces.push({
      name: interfaceDeclaration.name.escapedText.toString(),
      properties,
      methods,
    });

    return { traverse: false };
  },
});

// eslint-disable-next-line no-console
console.log(
  `
Declared interfaces:
  ${interfaces
    .map((i) => `${i.name}: [${i.properties.join(', ')}] [${i.methods.join(', ')}]`)
    .join(', ')}`,
);

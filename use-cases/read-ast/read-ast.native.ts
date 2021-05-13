// https://github.com/ktsn/ts-compiler-api-examples/blob/master/src/1-read-ast.ts

import * as ts from 'typescript';

const fileName = `${__dirname}/file.d.ts`;

// Create program
const program = ts.createProgram([fileName], {});

// Get source of the specified file
const source = program.getSourceFile(fileName);

// Print AST
if (source) {
  // Print all declared function names
  ts.forEachChild(source, (node) => {
    if (ts.isFunctionDeclaration(node)) {
      console.log(node.name && node.name.text);
    }
  });
}

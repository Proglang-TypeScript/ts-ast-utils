import ts from 'typescript';

export function emit(node: ts.Node): string {
  const resultFile = ts.createSourceFile(
    '',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ts.ScriptKind.TS,
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
}

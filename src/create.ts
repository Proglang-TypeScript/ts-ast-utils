import ts from 'typescript';

export function createFromString(content: string): ts.SourceFile {
  return ts.createSourceFile(
    '',
    content,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ts.ScriptKind.TS,
  );
}

export function createFromFile(fileName: string): ts.SourceFile {
  const program = ts.createProgram([fileName], {});
  return program.getSourceFile(fileName) || createFromString('');
}

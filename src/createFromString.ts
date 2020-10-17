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

import * as ts from 'typescript';

export const removeDataTestIdTransformer = <T extends ts.Node>(
  context: ts.TransformationContext,
) => {
  return (rootNode: T) => {
    const visit = (node: ts.Node): ts.Node | undefined => {
      if (ts.isJsxAttribute(node)) {
        if (node.name.getText() === 'data-testid') {
          return undefined;
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(rootNode, visit) as T;
  };
};

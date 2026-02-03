import { Project, SyntaxKind, JsxAttribute, Node } from 'ts-morph';

const project = new Project();
project.addSourceFilesAtPaths('src/**/*.tsx');

const featureName = process.argv[2];
const state = process.argv[3];

if (!featureName || (state !== 'on' && state !== 'off')) {
  console.error('Usage: ts-node remove-feature.ts <featureName> <on|off>');
  process.exit(1);
}

const getAttributeValue = (attr: JsxAttribute | undefined): string => {
  const initializer = attr?.getInitializer();
  if (!initializer) return '';

  if (Node.isJsxExpression(initializer)) {
    return initializer.getExpression()?.getText() ?? '';
  }

  return initializer.getText();
};

project.getSourceFiles().forEach((sourceFile) => {
  const components = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxOpeningElement)
    .filter((node) => node.getTagNameNode().getText() === 'ToggleFeature');

  const selfClosingComponents = sourceFile
    .getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)
    .filter((node) => node.getTagNameNode().getText() === 'ToggleFeature');

  const allToggleFeatures = [...components, ...selfClosingComponents];

  allToggleFeatures.forEach((node) => {
    const nameAttr = node.getAttribute('name') as JsxAttribute | undefined;
    const nameValue = nameAttr
      ?.getInitializer()
      ?.getText()
      .replace(/['"]/g, '');

    if (nameValue === featureName) {
      const stateAttr = node.getAttribute(state) as JsxAttribute | undefined;
      const replacement = getAttributeValue(stateAttr);

      let nodeToReplace: Node = node;
      if (Node.isJsxOpeningElement(node)) {
        const parent = node.getParent();
        if (Node.isJsxElement(parent)) {
          nodeToReplace = parent;
        }
      }

      if (replacement === 'null' || !replacement) {
        nodeToReplace.replaceWithText('');
      } else {
        nodeToReplace.replaceWithText(replacement);
      }
    }
  });
});

project
  .save()
  .then(() =>
    console.log(`Feature ${featureName} has been settled to ${state}`),
  );

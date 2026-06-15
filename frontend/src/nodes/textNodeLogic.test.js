import { extractVariables, getTextNodeLayout } from './textNodeLogic';

describe('Text node variables', () => {
  test('creates one handle for one valid variable', () => {
    expect(extractVariables('{{name}}')).toEqual(['name']);
  });

  test('creates a handle for each unique valid variable', () => {
    expect(extractVariables('{{email}}\n{{age}}\n{{email}}')).toEqual(['email', 'age']);
  });

  test('ignores invalid JavaScript variable names', () => {
    expect(extractVariables('{{valid_name}} {{2invalid}} {{not-valid}}')).toEqual(['valid_name']);
  });
});

describe('Text node layout', () => {
  test('widens as a short line grows', () => {
    expect(getTextNodeLayout('hello world').width).toBeGreaterThan(getTextNodeLayout('hello').width);
  });

  test('grows taller as lines are added', () => {
    const oneLine = getTextNodeLayout('hello');
    const threeLines = getTextNodeLayout('hello world\nline2\nline3');
    expect(threeLines.height).toBeGreaterThan(oneLine.height);
    expect(threeLines.textareaHeight).toBeGreaterThan(oneLine.textareaHeight);
  });

  test('grows taller to fit multiple variable handles', () => {
    expect(getTextNodeLayout('{{email}}\n{{age}}', 2).height)
      .toBeGreaterThan(getTextNodeLayout('{{email}}', 1).height);
  });
});

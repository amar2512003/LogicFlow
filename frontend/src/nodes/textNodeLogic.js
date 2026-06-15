const variablePattern = /{{\s*([A-Za-z_$][\w$]*)\s*}}/g;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const extractVariables = (text) => (
  [...new Set([...text.matchAll(variablePattern)].map((match) => match[1]))]
);

export const getTextNodeLayout = (text, variableCount = extractVariables(text).length) => {
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map((line) => line.length), 1);
  const width = clamp(236 + longestLine * 4, 250, 520);
  const charactersPerLine = Math.max(18, Math.floor((width - 52) / 7));
  const visualLines = lines.reduce(
    (count, line) => count + Math.max(1, Math.ceil(line.length / charactersPerLine)),
    0,
  );
  const textareaHeight = clamp(54 + (visualLines - 1) * 20, 54, 220);
  const handleAreaHeight = variableCount > 1 ? (variableCount - 1) * 24 : 0;
  const height = clamp(132 + textareaHeight + handleAreaHeight, 186, 420);

  return { width, height, textareaHeight };
};

// textNode.js

import { useEffect, useMemo } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';
import { useNodeField } from './useNodeField';

const variablePattern = /{{\s*([A-Za-z_$][\w$]*)\s*}}/g;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getVariables = (text) => [...new Set([...text.matchAll(variablePattern)].map((match) => match[1]))];

const getLayout = (text, variableCount) => {
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

export const TextNode = ({ id, data }) => {
  const [text, setText] = useNodeField(id, 'text', data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();
  const variables = useMemo(() => getVariables(text), [text]);
  const { width, height, textareaHeight } = getLayout(text, variables.length);

  useEffect(() => {
    updateNodeInternals(id);
  }, [height, id, updateNodeInternals, variables.length, width]);

  return (
    <BaseNode id={id} title="Text" subtitle="Compose a prompt" icon="TXT" accent="#ec4899"
      className="text-node"
      style={{ width, height }}
      handles={[
        ...variables.map((variable, index) => ({
          type: 'target', position: 'left', id: variable,
          style: { top: `${104 + index * 24}px` },
          label: variable,
        })),
        { type: 'source', position: 'right', id: 'output' },
      ]}>
      <textarea value={text} onChange={(e) => setText(e.target.value)}
        style={{ height: textareaHeight }}
        placeholder="Write text and use {{ variable }} to add inputs." />
    </BaseNode>
  );
}

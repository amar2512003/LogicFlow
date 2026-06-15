// textNode.js

import { useEffect, useMemo } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';
import { useNodeField } from './useNodeField';
import { extractVariables, getTextNodeLayout } from './textNodeLogic';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useNodeField(id, 'text', data?.text || '{{input}}');
  const updateNodeInternals = useUpdateNodeInternals();
  const variables = useMemo(() => extractVariables(text), [text]);
  const { width, height, textareaHeight } = getTextNodeLayout(text, variables.length);

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

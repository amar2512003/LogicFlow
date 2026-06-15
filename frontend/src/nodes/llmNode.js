// llmNode.js

import { BaseNode, NodeField } from './baseNode';
import { useNodeField } from './useNodeField';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useNodeField(id, 'model', data?.model || 'GPT-4o mini');

  return (
    <BaseNode id={id} title="LLM" subtitle="Generate with AI" icon="AI" accent="#7c5cff"
      handles={[
        { type: 'target', position: 'left', id: 'system', style: { top: '42%' } },
        { type: 'target', position: 'left', id: 'prompt', style: { top: '72%' } },
        { type: 'source', position: 'right', id: 'response' },
      ]}>
      <NodeField label="Model"><select value={model} onChange={(e) => setModel(e.target.value)}>
        <option>GPT-4o mini</option><option>Claude 3.5</option><option>Llama 3</option>
      </select></NodeField>
    </BaseNode>
  );
}

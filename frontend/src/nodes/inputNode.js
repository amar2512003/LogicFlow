// inputNode.js

import { BaseNode, NodeField } from './baseNode';
import { useNodeField } from './useNodeField';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useNodeField(id, 'inputName', data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType] = useNodeField(id, 'inputType', data?.inputType || 'Text');

  return (
    <BaseNode id={id} title="Input" subtitle="Pipeline source" icon="IN" accent="#14b8a6"
      handles={[{ type: 'source', position: 'right', id: 'value' }]}>
      <NodeField label="Name"><input value={name} onChange={(e) => setName(e.target.value)} /></NodeField>
      <NodeField label="Type"><select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Text</option><option>File</option>
      </select></NodeField>
    </BaseNode>
  );
}

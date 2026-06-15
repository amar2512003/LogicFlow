// outputNode.js

import { BaseNode, NodeField } from './baseNode';
import { useNodeField } from './useNodeField';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useNodeField(id, 'outputName', data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType] = useNodeField(id, 'outputType', data?.outputType || 'Text');

  return (
    <BaseNode id={id} title="Output" subtitle="Pipeline result" icon="OUT" accent="#f59e0b"
      handles={[{ type: 'target', position: 'left', id: 'value' }]}>
      <NodeField label="Name"><input value={name} onChange={(e) => setName(e.target.value)} /></NodeField>
      <NodeField label="Type"><select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Text</option><option>Image</option>
      </select></NodeField>
    </BaseNode>
  );
}

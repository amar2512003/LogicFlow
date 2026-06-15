import { BaseNode, NodeField } from './baseNode';
import { useNodeField } from './useNodeField';

const SimpleNode = ({ id, data, config }) => {
  const [value, setValue] = useNodeField(id, config.field, data?.[config.field] || config.defaultValue);
  return (
    <BaseNode id={id} {...config} handles={config.handles}>
      <NodeField label={config.label}>
        {config.options ? (
          <select value={value} onChange={(e) => setValue(e.target.value)}>
            {config.options.map((option) => <option key={option}>{option}</option>)}
          </select>
        ) : <input value={value} onChange={(e) => setValue(e.target.value)} />}
      </NodeField>
    </BaseNode>
  );
};

export const ApiNode = (props) => <SimpleNode {...props} config={{
  title: 'API Request', subtitle: 'Fetch external data', icon: 'API', accent: '#06b6d4',
  field: 'url', label: 'Endpoint', defaultValue: 'https://api.example.com',
  handles: [{ type: 'target', position: 'left', id: 'payload' }, { type: 'source', position: 'right', id: 'response' }],
}} />;

export const TransformNode = (props) => <SimpleNode {...props} config={{
  title: 'Transform', subtitle: 'Reshape incoming data', icon: 'FX', accent: '#8b5cf6',
  field: 'operation', label: 'Operation', defaultValue: 'Map',
  options: ['Map', 'Filter', 'Reduce'],
  handles: [{ type: 'target', position: 'left', id: 'input' }, { type: 'source', position: 'right', id: 'output' }],
}} />;

export const ConditionNode = (props) => <SimpleNode {...props} config={{
  title: 'Condition', subtitle: 'Branch by a rule', icon: 'IF', accent: '#f97316',
  field: 'condition', label: 'Rule', defaultValue: 'value > 0',
  handles: [
    { type: 'target', position: 'left', id: 'value' },
    { type: 'source', position: 'right', id: 'true', style: { top: '43%' } },
    { type: 'source', position: 'right', id: 'false', style: { top: '75%' } },
  ],
}} />;

export const DatabaseNode = (props) => <SimpleNode {...props} config={{
  title: 'Database', subtitle: 'Query a data source', icon: 'DB', accent: '#22c55e',
  field: 'table', label: 'Table', defaultValue: 'customers',
  handles: [{ type: 'target', position: 'left', id: 'query' }, { type: 'source', position: 'right', id: 'rows' }],
}} />;

export const EmailNode = (props) => <SimpleNode {...props} config={{
  title: 'Send Email', subtitle: 'Deliver a message', icon: '@', accent: '#ef4444',
  field: 'recipient', label: 'Recipient', defaultValue: 'hello@example.com',
  handles: [{ type: 'target', position: 'left', id: 'message' }, { type: 'source', position: 'right', id: 'status' }],
}} />;

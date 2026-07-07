import { Handle, Position } from 'reactflow';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const NodeField = ({ label, children }) => (
  <label className="node-field">
    <span>{label}</span>
    {children}
  </label>
);

export const BaseNode = ({
  id,
  title,
  subtitle,
  icon,
  accent = '#7c5cff',
  handles = [],
  children,
  className = '',
  style,
}) => (
  <div
    className={`pipeline-node ${className}`}
    style={{ '--node-accent': accent, ...style }}
  >
    <div className="node-heading">
      <div className="node-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
    {children && <div className="node-content">{children}</div>}
    {handles.map((handle) => {
      const handleId = `${id}-${handle.id}`;
      return (
        <div key={`${handle.type}-${handle.id}`}>
          <Handle
            type={handle.type}
            position={positionMap[handle.position]}
            id={handleId}
            style={handle.style}
            className="node-handle"
          />
          {handle.label && (
            <span className="handle-label" style={{ top: handle.style?.top }}>
              {handle.label}
            </span>
          )}
        </div>
      );
    })}
  </div>
);

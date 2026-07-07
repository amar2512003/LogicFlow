// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodes = [
        ['customInput', 'Input', 'IN'], ['llm', 'LLM', 'AI'], ['customOutput', 'Output', 'OUT'],
        ['text', 'Text', 'TXT'], ['api', 'API Request', 'API'], ['transform', 'Transform', 'FX'],
        ['condition', 'Condition', 'IF'], ['database', 'Database', 'DB'], ['email', 'Send Email', '@'],
    ];
    return (
        <section className="toolbar-section">
            <div className="section-title">
                <div><span>Node library</span><small>Drag a building block onto the canvas</small></div>
                <span className="node-count">{nodes.length} nodes</span>
            </div>
            <div className="node-library">
                {nodes.map(([type, label, icon]) => <DraggableNode key={type} type={type} label={label} icon={icon} />)}
            </div>
        </section>
    );
};

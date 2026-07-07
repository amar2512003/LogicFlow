import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    return (
        <div className="submit-bar">
            <div><strong>Ready to validate?</strong><span>Check your pipeline structure before publishing.</span></div>
            <button type="button" disabled={isSubmitting} onClick={async () => {
                setIsSubmitting(true);
                try {
                    const response = await fetch('/pipelines/parse', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nodes, edges }),
                    });
                    if (!response.ok) throw new Error('The backend could not analyze this pipeline.');
                    const result = await response.json();
                    alert(`Pipeline analysis complete\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nDirected acyclic graph: ${result.is_dag ? 'Yes' : 'No'}`);
                } catch (error) {
                    alert(`${error.message}\n\nStart the project with ./start.sh so the frontend and backend run together.`);
                } finally {
                    setIsSubmitting(false);
                }
            }}>{isSubmitting ? 'Analyzing...' : 'Analyze pipeline'} <span>→</span></button>
        </div>
    );
}

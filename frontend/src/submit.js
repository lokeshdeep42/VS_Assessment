// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [toast, setToast] = useState(null);

    // Function to check if graph is a DAG (Directed Acyclic Graph)
    const isDAG = (nodes, edges) => {
        // Build adjacency list
        const adjacencyList = {};
        nodes.forEach(node => {
            adjacencyList[node.id] = [];
        });

        edges.forEach(edge => {
            if (adjacencyList[edge.source]) {
                adjacencyList[edge.source].push(edge.target);
            }
        });

        // DFS to detect cycles
        const visited = new Set();
        const recursionStack = new Set();

        const hasCycle = (nodeId) => {
            visited.add(nodeId);
            recursionStack.add(nodeId);

            const neighbors = adjacencyList[nodeId] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    if (hasCycle(neighbor)) {
                        return true;
                    }
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }

            recursionStack.delete(nodeId);
            return false;
        };

        // Check all nodes
        for (const nodeId of Object.keys(adjacencyList)) {
            if (!visited.has(nodeId)) {
                if (hasCycle(nodeId)) {
                    return false;
                }
            }
        }

        return true;
    };

    const handleSubmit = async () => {
        console.log('Submit button clicked!');
        console.log('Nodes:', nodes);
        console.log('Edges:', edges);

        // Validate pipeline
        if (nodes.length === 0) {
            alert('Pipeline is empty! Please add some nodes first.');
            return;
        }

        // Calculate pipeline metrics
        const numNodes = nodes.length;
        const numEdges = edges.length;
        const isDag = isDAG(nodes, edges);

        // Parse pipeline data
        const pipelineData = {
            nodes: nodes.map(node => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: node.data,
            })),
            edges: edges.map(edge => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
            })),
        };

        try {
            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display results with toast
            const message = `✅ Pipeline Submitted Successfully!\n\nNodes: ${numNodes} | Edges: ${numEdges} | DAG: ${isDag ? 'Yes' : 'No'}\n\nBackend Response: ${JSON.stringify(result, null, 2)}`;
            setToast({ type: 'success', message });
            setTimeout(() => setToast(null), 5000);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            const message = `⚠️ Pipeline Analysis (Backend Unavailable)\n\nNodes: ${numNodes} | Edges: ${numEdges} | DAG: ${isDag ? 'Yes' : 'No'}\n\nError: ${error.message}\n\nNote: Make sure the backend server is running on http://localhost:8000`;
            setToast({ type: 'error', message });
            setTimeout(() => setToast(null), 5000);
        }
    };

    return (
        <>
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    maxWidth: '400px',
                    padding: '16px 20px',
                    background: toast.type === 'success'
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    zIndex: 9999,
                    animation: 'slideIn 0.3s ease-out',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    fontWeight: '500',
                }}>
                    {toast.message}
                </div>
            )}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}>
                <button type="button" className="submit-button" onClick={handleSubmit}>
                    Submit Pipeline
                </button>
            </div>
        </>
    );
}

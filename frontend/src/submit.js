

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [toast, setToast] = useState(null);

    const handleSubmit = async () => {

        if (nodes.length === 0) {
            const message = 'Pipeline is Empty!\n\nPlease add some nodes before submitting.';
            setToast({ type: 'error', message });
            setTimeout(() => setToast(null), 5000);
            return;
        }

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

            const message = `Pipeline Submitted Successfully!\n\nNodes: ${result.num_nodes} | Edges: ${result.num_edges} | DAG: ${result.is_dag ? 'Yes' : 'No'}`;
            setToast({ type: 'success', message });
            setTimeout(() => setToast(null), 5000);

        } catch (error) {
            const message = `Backend Unavailable\n\n${error.message}\n\nPlease make sure the backend server is running on http://localhost:8000`;
            setToast({ type: 'disconnected', message });
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
                    maxWidth: '420px',
                    padding: '20px 24px',
                    background: '#e8eaf6',
                    border: '2px solid #5c6bc0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(92, 107, 192, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 9999,
                    animation: 'slideIn 0.3s ease-out',
                    whiteSpace: 'pre-wrap',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    color: '#333333',
                }}>
                    {/* Header with Icon and Close Button */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid rgba(92, 107, 192, 0.2)',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <img
                                src={
                                    toast.type === 'success'
                                        ? '/icon-success.png'
                                        : toast.type === 'disconnected'
                                            ? '/icon-disconnected.png'
                                            : '/icon-error.png'
                                }
                                alt={toast.type}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#5c6bc0',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                            }}>
                                {toast.type === 'success' ? 'Success' : toast.type === 'disconnected' ? 'Disconnected' : 'Error'}
                            </span>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setToast(null)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#5c6bc0',
                                cursor: 'pointer',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease',
                                padding: 0,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(92, 107, 192, 0.1)';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Message Content */}
                    <div style={{
                        color: '#333333',
                        fontSize: '13px',
                        lineHeight: '1.6',
                    }}>
                        {toast.message}
                    </div>
                </div>
            )}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
            }}>
                <button type="button" className="submit-button" onClick={handleSubmit}>
                    Submit Pipeline
                </button>
            </div>
        </>
    );
}

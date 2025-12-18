// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '0px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <h3 style={{
                color: 'white',
                marginTop: 0,
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600',
                textAlign: 'center',
            }}>
                Node Palette
            </h3>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='api' label='API Call' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='aggregate' label='Aggregate' />
            </div>
        </div>
    );
};

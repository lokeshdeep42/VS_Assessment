

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    icon: '/icon-llm.png',
    fields: [],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: `${100 / 3}%` },
        label: 'system',
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: `${200 / 3}%` },
        label: 'prompt',
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`,
      },
    ],
    styles: {
      background: '#e8eaf6',
      border: '1.5px solid #5c6bc0',
    },
    renderContent: () => (
      <div style={{
        fontSize: '11px',
        textAlign: 'center',
        color: '#333333',
        padding: '8px 0',
      }}>
        This is a LLM.
      </div>
    ),
  };

  return <BaseNode id={id} data={data} config={config} />;
}

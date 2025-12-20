

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const config = {
        title: 'Transform',
        icon: '/icon-transform.png',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: data?.operation || 'uppercase',
                options: [
                    { value: 'uppercase', label: 'Uppercase' },
                    { value: 'lowercase', label: 'Lowercase' },
                    { value: 'trim', label: 'Trim' },
                    { value: 'reverse', label: 'Reverse' },
                    { value: 'capitalize', label: 'Capitalize' },
                ],
            },
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input`,
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-output`,
            },
        ],
        styles: {
            background: '#e8eaf6',
            border: '1.5px solid #5c6bc0',
        },
    };

    return <BaseNode id={id} data={data} config={config} />;
};

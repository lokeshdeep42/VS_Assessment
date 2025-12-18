// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const config = {
        title: 'Transform',
        icon: '⚙️',
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
            background: '#fef3c7',
            border: '1.5px solid #f59e0b',
        },
    };

    return <BaseNode id={id} data={data} config={config} />;
};

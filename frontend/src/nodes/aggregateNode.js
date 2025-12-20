

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const AggregateNode = ({ id, data }) => {
    const config = {
        title: 'Aggregate',
        icon: '/icon-aggregate.png',
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: data?.operation || 'concat',
                options: [
                    { value: 'concat', label: 'Concatenate' },
                    { value: 'sum', label: 'Sum' },
                    { value: 'average', label: 'Average' },
                    { value: 'max', label: 'Maximum' },
                    { value: 'min', label: 'Minimum' },
                ],
            },
            {
                name: 'separator',
                label: 'Separator',
                type: 'text',
                defaultValue: data?.separator || ', ',
                placeholder: 'e.g., ", "',
            },
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input1`,
                style: { top: '25%' },
                label: 'input1',
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input2`,
                style: { top: '50%' },
                label: 'input2',
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input3`,
                style: { top: '75%' },
                label: 'input3',
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

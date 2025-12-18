// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const config = {
        title: 'Filter',
        icon: '🔍',
        fields: [
            {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                defaultValue: data?.condition || 'equals',
                options: [
                    { value: 'equals', label: 'Equals' },
                    { value: 'contains', label: 'Contains' },
                    { value: 'greater', label: 'Greater Than' },
                    { value: 'less', label: 'Less Than' },
                ],
            },
            {
                name: 'value',
                label: 'Value',
                type: 'text',
                defaultValue: data?.value || '',
                placeholder: 'Filter value',
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
            background: '#ccfbf1',
            border: '1.5px solid #14b8a6',
        },
    };

    return <BaseNode id={id} data={data} config={config} />;
};

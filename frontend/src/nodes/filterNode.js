

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const config = {
        title: 'Filter',
        icon: '/icon-filter.png',
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
            background: '#e8eaf6',
            border: '1.5px solid #5c6bc0',
        },
    };

    return <BaseNode id={id} data={data} config={config} />;
};

// conditionalNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
    const config = {
        title: 'Conditional',
        icon: '🔀',
        fields: [
            {
                name: 'operator',
                label: 'Operator',
                type: 'select',
                defaultValue: data?.operator || 'equals',
                options: [
                    { value: 'equals', label: '==' },
                    { value: 'notEquals', label: '!=' },
                    { value: 'greater', label: '>' },
                    { value: 'less', label: '<' },
                    { value: 'greaterOrEqual', label: '>=' },
                    { value: 'lessOrEqual', label: '<=' },
                ],
            },
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-condition`,
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-true`,
                style: { top: '33%' },
                label: 'true',
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-false`,
                style: { top: '66%' },
                label: 'false',
            },
        ],
        styles: {
            background: '#e0f2fe',
            border: '1.5px solid #0ea5e9',
        },
    };

    return <BaseNode id={id} data={data} config={config} />;
};



import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
    const config = {
        title: 'API Call',
        icon: '/icon-api.png',
        fields: [
            {
                name: 'method',
                label: 'Method',
                type: 'select',
                defaultValue: data?.method || 'GET',
                options: [
                    { value: 'GET', label: 'GET' },
                    { value: 'POST', label: 'POST' },
                    { value: 'PUT', label: 'PUT' },
                    { value: 'DELETE', label: 'DELETE' },
                ],
            },
            {
                name: 'url',
                label: 'URL',
                type: 'text',
                defaultValue: data?.url || '',
                placeholder: 'https://api.example.com',
            },
        ],
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-body`,
                style: { top: '33%' },
                label: 'body',
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-headers`,
                style: { top: '66%' },
                label: 'headers',
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
    };

    return <BaseNode id={id} data={data} config={config} />;
};

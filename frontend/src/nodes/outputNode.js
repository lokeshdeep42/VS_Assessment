

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    icon: '/icon-output.png',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' },
        ],
      },
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`,
      },
    ],
    styles: {
      background: '#e8eaf6',
      border: '1.5px solid #5c6bc0',
    },
  };

  return <BaseNode id={id} data={data} config={config} />;
}

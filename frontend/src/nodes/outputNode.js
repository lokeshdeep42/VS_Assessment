// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    icon: '📤',
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
      background: '#fce4ec',
      border: '1.5px solid #ec407a',
    },
  };

  return <BaseNode id={id} data={data} config={config} />;
}



import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  // Function to extract variables from text using {{variable}} pattern
  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const variables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return variables;
  };

  // Dynamic handle generator based on detected variables
  const generateDynamicHandles = (fieldValues, baseHandles) => {
    const text = fieldValues.text || '';
    const variables = extractVariables(text);

    // Create target handles for each variable
    const variableHandles = variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: {
        top: `${((index + 1) * 100) / (variables.length + 1)}%`,
      },
      label: variable,
    }));

    // Always include the output handle
    const outputHandle = {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`,
    };

    return [...variableHandles, outputHandle];
  };

  const config = {
    title: 'Text',
    icon: '/icon-text.png',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: data?.text || '{{input}}',
        placeholder: 'Enter text with {{variables}}',
      },
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`,
      },
    ],
    dynamicHandles: generateDynamicHandles,
    styles: {
      background: '#e8eaf6',
      border: '1.5px solid #5c6bc0',
      minHeight: 120,
    },
  };

  return <BaseNode id={id} data={data} config={config} />;
}



import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, ControlButton, useReactFlow } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { ApiNode } from './nodes/apiNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { AggregateNode } from './nodes/aggregateNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  api: ApiNode,
  conditional: ConditionalNode,
  aggregate: AggregateNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const EraseButton = () => {
  const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

  const handleDelete = () => {
    const selectedNodes = getNodes().filter(node => node.selected);
    const selectedNodeIds = selectedNodes.map(node => node.id);
    const selectedEdges = getEdges().filter(edge => edge.selected);

    if (selectedNodeIds.length > 0) {
      setNodes(getNodes().filter(node => !node.selected));
    }

    setEdges(getEdges().filter(edge =>
      !edge.selected &&
      !selectedNodeIds.includes(edge.source) &&
      !selectedNodeIds.includes(edge.target)
    ));
  };

  return (
    <ControlButton onClick={handleDelete} title="Delete selected nodes and edges">
      <div style={{ fontSize: '16px' }}>🗑️</div>
    </ControlButton>
  );
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const onNodesDelete = useCallback((nodesToDelete) => {
    const nodeIds = nodesToDelete.map(node => node.id);
  }, []);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls>
            <EraseButton />
          </Controls>
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  )
}

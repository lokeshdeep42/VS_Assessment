# VectorShift Frontend Technical Assessment

A professional node-based pipeline builder with a clean, modern UI featuring 10 different node types with icons and uniform styling.

![UI Preview](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## 🎨 Features

### Modern UI Design
- ✅ **10 Node Types** with distinctive icons (📥📤🤖📝🔗🌐⚙️🔍🔀)
- ✅ **Clean Color Palette** - Professional light backgrounds
- ✅ **Uniform Typography** - Consistent dark text (#333) for readability
- ✅ **Professional Styling** - Production-ready appearance

### Node Types

| Node | Icon | Purpose |
|------|------|---------|
| **Input** | 📥 | Data input with name and type fields |
| **Output** | 📤 | Data output with name and type fields |
| **LLM** | 🤖 | AI processing with system and prompt inputs |
| **Text** | 📝 | Text templates with dynamic variable support |
| **Aggregate** | 🔗 | Data aggregation with multiple operations |
| **API Call** | 🌐 | HTTP requests with method and URL configuration |
| **Transform** | ⚙️ | Data transformation (uppercase, lowercase, etc.) |
| **Filter** | 🔍 | Data filtering with conditions |
| **Conditional** | 🔀 | Branching logic with true/false outputs |

### Technical Features
- 🔄 **Dynamic Handles** - Text nodes generate handles based on `{{variables}}`
- 🎯 **Drag & Drop** - Intuitive node placement
- 🔗 **Connection System** - Visual pipeline building
- 📊 **Pipeline Submission** - Backend integration for DAG analysis

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/lokeshdeep42/VS_Assessment.git
cd VS_Assessment
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
python -m uvicorn main:app --reload
```
The backend will run on `http://localhost:8000`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
VS_Assessment/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js          # Reusable base component
│   │   │   ├── inputNode.js         # Input node (📥)
│   │   │   ├── outputNode.js        # Output node (📤)
│   │   │   ├── llmNode.js           # LLM node (🤖)
│   │   │   ├── textNode.js          # Text node (📝)
│   │   │   ├── aggregateNode.js     # Aggregate node (🔗)
│   │   │   ├── apiNode.js           # API Call node (🌐)
│   │   │   ├── transformNode.js     # Transform node (⚙️)
│   │   │   ├── filterNode.js        # Filter node (🔍)
│   │   │   └── conditionalNode.js   # Conditional node (🔀)
│   │   ├── ui.js                    # Main UI component
│   │   ├── submit.js                # Pipeline submission logic
│   │   └── toolbar.js               # Node palette toolbar
│   └── package.json
├── backend/
│   ├── main.py                      # FastAPI server
│   └── requirements.txt
└── README.md
```

## 🎯 Usage

### Building a Pipeline

1. **Add Nodes**: Click or drag nodes from the palette to the canvas
2. **Configure Nodes**: Fill in the required fields for each node
3. **Connect Nodes**: Drag from output handles to input handles
4. **Submit Pipeline**: Click "Submit Pipeline" to send to backend

### Example: Text Template Pipeline

1. Add an **Input** node (📥) - Configure as "Text" type
2. Add a **Text** node (📝) - Enter template: `Hello {{input}}!`
3. Add an **Output** node (📤) - Configure as "Text" type
4. Connect: Input → Text → Output
5. Submit to see the DAG structure

## 🎨 Design System

### Color Palette
- **Input**: Light Indigo (#e8eaf6)
- **Output**: Light Pink (#fce4ec)
- **LLM**: Light Cyan (#e1f5fe)
- **Text**: Light Orange (#fff3e0)
- **Aggregate**: Light Purple (#f3e5f5)
- **API Call**: Light Rose (#ffe4e6)
- **Transform**: Light Amber (#fef3c7)
- **Filter**: Light Teal (#ccfbf1)
- **Conditional**: Light Sky Blue (#e0f2fe)

### Typography
- **Title**: 13px, Bold, #333333
- **Labels**: 11px, Medium, #666666
- **Input Text**: 12px, Regular, #333333

## 🔧 API Endpoints

### POST `/pipelines/parse`
Analyzes the pipeline structure and returns:
- Number of nodes
- Number of edges
- Whether the graph is a DAG (Directed Acyclic Graph)

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## 🛠️ Development

### Adding a New Node Type

1. Create a new file in `frontend/src/nodes/`
2. Use the BaseNode component:

```javascript
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CustomNode = ({ id, data }) => {
  const config = {
    title: 'Custom',
    icon: '🎯',
    fields: [
      {
        name: 'fieldName',
        label: 'Field Label',
        type: 'text',
        defaultValue: data?.fieldName || '',
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
      background: '#yourColor',
      border: '1.5px solid #borderColor',
    },
  };

  return <BaseNode id={id} data={data} config={config} />;
};
```

3. Register in `ui.js` nodeTypes

## 📝 Technical Decisions

### BaseNode Abstraction
Created a flexible `BaseNode` component to:
- Reduce code duplication
- Ensure consistent styling
- Simplify adding new node types
- Centralize common functionality

### Dynamic Handles
Text nodes automatically generate input handles based on `{{variable}}` patterns in the template, enabling flexible data flow.

### Color System
Light, professional backgrounds with dark text ensure:
- Excellent readability
- Professional appearance
- Clear visual distinction between node types

## 🎓 Assessment Requirements

✅ **Node Abstraction** - BaseNode component for reusability  
✅ **Text Node** - Dynamic handles based on variables  
✅ **Styling** - Professional, clean UI design  
✅ **Additional Nodes** - 5+ extra node types implemented  
✅ **Backend Integration** - Pipeline submission and DAG analysis  

## 📸 Screenshots

### Complete Node Palette
All 10 node types with icons and clean styling

### Pipeline Example
Visual demonstration of connected nodes forming a data pipeline

## 🤝 Contributing

This is a technical assessment project. For questions or feedback, please contact the repository owner.

## 📄 License

This project is part of a technical assessment for VectorShift.

## 👤 Author

**Lokesh Deep**
- GitHub: [@lokeshdeep42](https://github.com/lokeshdeep42)
- Repository: [VS_Assessment](https://github.com/lokeshdeep42/VS_Assessment)

---

**Built with ❤️ for VectorShift Technical Assessment**

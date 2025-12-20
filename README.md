# VectorShift Frontend Technical Assessment

A professional node-based pipeline builder with a modern, clean UI featuring custom icons, unified styling, and enhanced user experience.

![UI Preview](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## ✨ Features

### Modern UI Design
- 🎨 **Professional Icons** - Custom SVG icons for all node types and UI elements
- 🎯 **Unified Color Scheme** - Consistent indigo theme (#e8eaf6 background, #5c6bc0 border)
- 🌟 **Modern Toolbar** - Dark gradient background with organized node categories
- 📱 **Enhanced Notifications** - Icon-based toast system with success, error, and disconnected states
- 🧹 **Clean Codebase** - Production-ready with no debug code or unnecessary comments

### Node Types

| Node | Icon | Purpose |
|------|------|---------|
| **Input** | <img src="frontend/public/icon-input.png" width="24" /> | Data input with name and type fields |
| **Output** | <img src="frontend/public/icon-output.png" width="24" /> | Data output with name and type fields |
| **LLM** | <img src="frontend/public/icon-llm.png" width="24" /> | AI processing with system and prompt inputs |
| **Text** | <img src="frontend/public/icon-text.png" width="24" /> | Text templates with dynamic variable support |
| **Aggregate** | <img src="frontend/public/icon-aggregate.png" width="24" /> | Data aggregation with multiple operations |
| **API Call** | <img src="frontend/public/icon-api.png" width="24" /> | HTTP requests with method and URL configuration |
| **Transform** | <img src="frontend/public/icon-transform.png" width="24" /> | Data transformation (uppercase, lowercase, etc.) |
| **Filter** | <img src="frontend/public/icon-filter.png" width="24" /> | Data filtering with conditions |
| **Conditional** | <img src="frontend/public/icon-conditional.png" width="24" /> | Branching logic with true/false outputs |

### Technical Features
- 🔄 **Dynamic Handles** - Text nodes generate handles based on `{{variables}}`
- 🎯 **Drag & Drop** - Intuitive node placement from organized toolbar
- 🔗 **Connection System** - Visual pipeline building with smooth connections
- 📊 **Pipeline Submission** - Backend integration for DAG analysis
- 🗑️ **Delete Functionality** - Remove selected nodes and edges with delete button or keyboard
- 💬 **Smart Notifications** - Context-aware toast messages with appropriate icons

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
│   ├── public/
│   │   ├── icon-input.png          # Input node icon
│   │   ├── icon-output.png         # Output node icon
│   │   ├── icon-text.png           # Text node icon
│   │   ├── icon-llm.png            # LLM node icon
│   │   ├── icon-aggregate.png      # Aggregate node icon
│   │   ├── icon-api.png            # API node icon
│   │   ├── icon-transform.png      # Transform node icon
│   │   ├── icon-filter.png         # Filter node icon
│   │   ├── icon-conditional.png    # Conditional node icon
│   │   ├── icon-success.png        # Success toast icon
│   │   ├── icon-error.png          # Error toast icon
│   │   └── icon-disconnected.png   # Disconnected toast icon
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js         # Reusable base component
│   │   │   ├── inputNode.js        # Input node
│   │   │   ├── outputNode.js       # Output node
│   │   │   ├── llmNode.js          # LLM node
│   │   │   ├── textNode.js         # Text node
│   │   │   ├── aggregateNode.js    # Aggregate node
│   │   │   ├── apiNode.js          # API Call node
│   │   │   ├── transformNode.js    # Transform node
│   │   │   ├── filterNode.js       # Filter node
│   │   │   └── conditionalNode.js  # Conditional node
│   │   ├── ui.js                   # Main UI component
│   │   ├── submit.js               # Pipeline submission with toast notifications
│   │   ├── toolbar.js              # Modern node palette toolbar
│   │   ├── draggableNode.js        # Draggable node component
│   │   └── store.js                # Zustand state management
│   └── package.json
├── backend/
│   ├── main.py                     # FastAPI server
│   └── requirements.txt
└── README.md
```

## 🎯 Usage

### Building a Pipeline

1. **Add Nodes**: Drag nodes from the categorized toolbar to the canvas
   - **Input/Output**: Input, Output, Text
   - **Processing**: LLM, Transform, API Call
   - **Logic & Flow**: Filter, Conditional, Aggregate

2. **Configure Nodes**: Fill in the required fields for each node

3. **Connect Nodes**: Drag from output handles to input handles

4. **Delete Nodes**: Select nodes/edges and press Delete key or click the delete button

5. **Submit Pipeline**: Click "Submit Pipeline" to send to backend

### Example: Text Template Pipeline

1. Add an **Input** node - Configure as "Text" type
2. Add a **Text** node - Enter template: `Hello {{input}}!`
3. Add an **Output** node - Configure as "Text" type
4. Connect: Input → Text → Output
5. Submit to see the DAG structure

## 🎨 Design System

### Color Palette
All nodes use a **unified indigo theme** for a professional, cohesive appearance:
- **Background**: Light Indigo (#e8eaf6)
- **Border**: Indigo (#5c6bc0)
- **Text**: Dark Gray (#333333)

### Toolbar Design
- **Background**: Dark gradient (linear-gradient(135deg, #2d3748 0%, #1a202c 100%))
- **Title**: White, 16px, Bold
- **Categories**: White, 11px, Uppercase
- **Organized Layout**: Three categories with visual separators

### Toast Notifications
- **Success**: Green checkmark icon - Pipeline submitted successfully
- **Error**: Red X icon - Validation errors (e.g., empty pipeline)
- **Disconnected**: Broken link icon - Backend unavailable
- **Design**: Indigo background with icon header and clean message layout

### Typography
- **Node Title**: 13px, Bold, #333333
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
    icon: '/icon-custom.png',
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
      background: '#e8eaf6',
      border: '1.5px solid #5c6bc0',
    },
  };

  return <BaseNode id={id} data={data} config={config} />;
};
```

3. Add icon to `public/` folder
4. Register in `ui.js` nodeTypes
5. Add to toolbar in `toolbar.js`

## 📝 Technical Decisions

### BaseNode Abstraction
Created a flexible `BaseNode` component to:
- Reduce code duplication
- Ensure consistent styling
- Simplify adding new node types
- Centralize common functionality
- Support both emoji and image icons

### Icon System
- Custom SVG/PNG icons for professional appearance
- Consistent 16x16px sizing for toolbar
- 24x24px for toast notifications
- Automatic fallback for emoji icons

### Dynamic Handles
Text nodes automatically generate input handles based on `{{variable}}` patterns in the template, enabling flexible data flow.

### Unified Color System
Single indigo theme across all nodes ensures:
- Professional, cohesive appearance
- Excellent readability
- Clear visual hierarchy
- Production-ready design

### Clean Codebase
- No console.log statements
- No unnecessary comments
- No debug code
- Production-ready structure

## 🎓 Assessment Requirements

✅ **Node Abstraction** - BaseNode component for reusability  
✅ **Text Node** - Dynamic handles based on variables  
✅ **Styling** - Professional, modern UI design with custom icons  
✅ **Additional Nodes** - 6 extra node types implemented  
✅ **Backend Integration** - Pipeline submission and DAG analysis  
✅ **Enhanced UX** - Toast notifications, delete functionality, organized toolbar  

## 🌟 Highlights

- **Modern Design**: Professional indigo theme with custom icons
- **User Experience**: Intuitive toolbar organization and smart notifications
- **Code Quality**: Clean, production-ready codebase
- **Extensibility**: Easy to add new node types with BaseNode abstraction
- **Functionality**: Full pipeline building with backend integration

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

// BaseNode.js
// Flexible node abstraction for creating reusable node components

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible abstraction for creating custom nodes
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {Object} props.config - Node configuration
 * @param {string} props.config.title - Node title
 * @param {Array} props.config.fields - Input fields configuration
 * @param {Array} props.config.handles - Handle configuration
 * @param {Object} props.config.styles - Custom styles
 * @param {Function} props.config.onFieldChange - Custom field change handler
 * @param {Function} props.config.renderContent - Custom content renderer
 */
export const BaseNode = ({ id, data, config }) => {
    const {
        title = 'Node',
        icon = '',
        fields = [],
        handles = [],
        styles = {},
        onFieldChange,
        renderContent,
        dynamicHandles = false,
    } = config;

    // Initialize state for all fields
    const initialState = fields.reduce((acc, field) => {
        acc[field.name] = data?.[field.name] || field.defaultValue || '';
        return acc;
    }, {});

    const [fieldValues, setFieldValues] = useState(initialState);
    const [computedHandles, setComputedHandles] = useState(handles);

    // Handle field changes
    const handleChange = (fieldName, value) => {
        setFieldValues(prev => ({ ...prev, [fieldName]: value }));

        // Call custom handler if provided
        if (onFieldChange) {
            onFieldChange(fieldName, value, fieldValues);
        }
    };

    // Update computed handles when field values change (for dynamic handles)
    useEffect(() => {
        if (dynamicHandles && typeof dynamicHandles === 'function') {
            const newHandles = dynamicHandles(fieldValues, handles);
            setComputedHandles(newHandles);
        }
    }, [fieldValues, dynamicHandles, handles]);

    // Default node styles - clean and professional
    const defaultStyles = {
        width: 220,
        minHeight: 80,
        background: '#e8eaf6', // Light indigo background
        border: '1.5px solid #5c6bc0',
        borderRadius: '8px',
        padding: '16px 14px',
        color: '#333333', // Dark text for readability
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        ...styles,
    };

    const titleStyles = {
        fontSize: '13px',
        fontWeight: '600',
        marginBottom: '10px',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#333333',
    };

    const fieldContainerStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    };

    const labelStyles = {
        fontSize: '11px',
        fontWeight: '500',
        marginBottom: '4px',
        color: '#666666',
    };

    const inputStyles = {
        width: '100%',
        padding: '8px 10px',
        fontSize: '12px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#333333',
        outline: 'none',
        transition: 'all 0.2s ease',
    };

    const selectStyles = {
        ...inputStyles,
        cursor: 'pointer',
        color: '#333333',
    };

    const textareaStyles = {
        ...inputStyles,
        minHeight: '60px',
        resize: 'vertical',
        fontFamily: 'inherit',
    };

    // Render input field based on type
    const renderField = (field) => {
        const { name, label, type = 'text', options = [], placeholder = '' } = field;
        const value = fieldValues[name];

        switch (type) {
            case 'select':
                return (
                    <div key={name}>
                        <div style={labelStyles}>{label}:</div>
                        <select
                            value={value}
                            onChange={(e) => handleChange(name, e.target.value)}
                            style={selectStyles}
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'textarea':
                return (
                    <div key={name}>
                        <div style={labelStyles}>{label}:</div>
                        <textarea
                            value={value}
                            onChange={(e) => handleChange(name, e.target.value)}
                            placeholder={placeholder}
                            style={textareaStyles}
                        />
                    </div>
                );

            case 'text':
            default:
                return (
                    <div key={name}>
                        <div style={labelStyles}>{label}:</div>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(name, e.target.value)}
                            placeholder={placeholder}
                            style={inputStyles}
                        />
                    </div>
                );
        }
    };

    // Render handles
    const renderHandles = () => {
        return computedHandles.map((handle, index) => {
            const {
                type,
                position,
                id: handleId,
                style = {},
                label,
            } = handle;

            const handleStyle = {
                background: '#fff',
                border: '2px solid #5a67d8',
                width: '10px',
                height: '10px',
                ...style,
            };

            // Handle label styling - consistent blue pills
            const labelStyle = {
                position: 'absolute',
                fontSize: '10px',
                fontWeight: '600',
                backgroundColor: '#5c6bc0',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
            };

            // Better positioning based on handle position
            if (position === Position.Left) {
                labelStyle.left = '-60px'; // Position outside node to avoid overlap
                labelStyle.top = style.top || '50%';
                labelStyle.transform = 'translateY(-50%)';
            } else if (position === Position.Right) {
                labelStyle.right = '-60px'; // Position outside node to avoid overlap
                labelStyle.top = style.top || '50%';
                labelStyle.transform = 'translateY(-50%)';
            }

            return (
                <div key={`${handleId}-${index}`}>
                    <Handle
                        type={type}
                        position={position}
                        id={handleId}
                        style={handleStyle}
                    />
                    {label && (
                        <div style={labelStyle}>
                            {label}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div style={defaultStyles} className="base-node">
            {renderHandles()}

            <div style={titleStyles}>
                {icon && <span style={{ marginRight: '6px' }}>{icon}</span>}
                {title}
            </div>

            {renderContent ? (
                renderContent(fieldValues, handleChange)
            ) : (
                <div style={fieldContainerStyles}>
                    {fields.map(field => renderField(field))}
                </div>
            )}
        </div>
    );
};

export default BaseNode;

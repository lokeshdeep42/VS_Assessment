import { DraggableNode } from './draggableNode';

const NodeIcon = ({ src, alt }) => (
    <img
        src={src}
        alt={alt}
        style={{
            width: '16px',
            height: '16px',
            marginRight: '6px',
            verticalAlign: 'middle',
        }}
    />
);

export const PipelineToolbar = () => {
    return (
        <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
            borderRadius: '0px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
        }}>
            <h3 style={{
                color: 'white',
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
            }}>
                PIPELINE BUILDER
            </h3>

            <div style={{
                width: '1px',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.2)',
            }}></div>

            <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flex: 1,
            }}>
                <div>
                    <div style={{
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}>
                        Input / Output
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        justifyContent: 'center',
                    }}>
                        <DraggableNode type='customInput' label={<><NodeIcon src="/icon-input.png" alt="Input" />Input</>} />
                        <DraggableNode type='customOutput' label={<><NodeIcon src="/icon-output.png" alt="Output" />Output</>} />
                        <DraggableNode type='text' label={<><NodeIcon src="/icon-text.png" alt="Text" />Text</>} />
                    </div>
                </div>

                <div style={{
                    width: '1px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.2)',
                }}></div>

                <div>
                    <div style={{
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}>
                        Processing
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        justifyContent: 'center',
                    }}>
                        <DraggableNode type='llm' label={<><NodeIcon src="/icon-llm.png" alt="LLM" />LLM</>} />
                        <DraggableNode type='transform' label={<><NodeIcon src="/icon-transform.png" alt="Transform" />Transform</>} />
                        <DraggableNode type='api' label={<><NodeIcon src="/icon-api.png" alt="API" />API Call</>} />
                    </div>
                </div>

                <div style={{
                    width: '1px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.2)',
                }}></div>

                <div>
                    <div style={{
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}>
                        Logic & Flow
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        justifyContent: 'center',
                    }}>
                        <DraggableNode type='filter' label={<><NodeIcon src="/icon-filter.png" alt="Filter" />Filter</>} />
                        <DraggableNode type='conditional' label={<><NodeIcon src="/icon-conditional.png" alt="Conditional" />Conditional</>} />
                        <DraggableNode type='aggregate' label={<><NodeIcon src="/icon-aggregate.png" alt="Aggregate" />Aggregate</>} />
                    </div>
                </div>
            </div>
        </div>
    );
};

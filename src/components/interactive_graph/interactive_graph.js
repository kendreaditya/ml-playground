import React, { useEffect, useState } from 'react';
import Point from './Point'
import './interactive_graph.css';
import '../../index.css'

let graphPosition = {
    x_top: null,
    y_top: null,
    x_bottom: null,
    y_bottom: null
};
const InteractiveGraph = () => {
    const [mouseDown, setMouseDown] = useState(false);
    const [points, setPoints] = useState([]);
    const [cluster, setCluster] = useState(0);
    const colors = ["#60A6F3", "#F7BD28"];
    const points_max = 500;

    const setGraphPosition = ref => {
        graphPosition.x_top = (graphPosition.x_top ? graphPosition.x_top : ref.offsetLeft)
        graphPosition.y_top = (graphPosition.y_top ? graphPosition.y_top : ref.offsetTop)
        graphPosition.x_bottom = (graphPosition.x_bottom ? graphPosition.x_bottom : ref.offsetLeft + ref.offsetWidth)
        graphPosition.y_bottom = (graphPosition.y_bottom ? graphPosition.y_bottom : ref.offsetTop + ref.offsetHeight)
    }

    const addPoint = (event, onClick = false) => {
        const checkPoint_X = (graphPosition.x_top < event.pageX && graphPosition.x_bottom > event.pageX);
        const checkPoint_Y = (graphPosition.y_top < event.pageY && graphPosition.y_bottom > event.pageY);

        if ((mouseDown || onClick) && points.length < points_max && checkPoint_X && checkPoint_Y) {
            setPoints([...points, [event.pageX, event.pageY, cluster]])
        }
    }

    return (
        <div>
            <div className="colors">
                {colors.map((color, idx) => (
                    <button className="color" style={{ backgroundColor: color }} onClick={() => (setCluster(idx))}></button>
                ))}
                <label>{points.length}/{points_max}</label>
                <button onClick={() => setPoints([])}>Reset</button>
            </div>
            <span id="interactive-graph" className="container graph" onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} onMouseMove={addPoint} onClick={event => addPoint(event, true)} ref={setGraphPosition} onMouseLeave={event => setMouseDown(false)}>
                {points.map(([x, y, cluster]) => {
                    return (
                        <Point x={x} y={y} color={colors[cluster]} />
                    );
                })}
            </span>
        </div>
    )
}

export default InteractiveGraph;
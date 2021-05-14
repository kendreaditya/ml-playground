import Point from './point';
import React, {useEffect, useState} from 'react';
import './interactive_graph.css';

const InteractiveGraph = () => {
    const graph_size = {x_lim: 50, y_lim: 50};
    const [mouseDown, setMouseDown] = useState(false)
    const [points, setPoints] = useState([]);
    const colors = ["#60A6F3", "#F7BD28"]
    const [cluster, setCluster] = useState(0)

    const handleDocumentMouseUp = event => {
        setMouseDown((event.buttons==0 ? false : true));
    };

    const addPoint = (x, y) => {
        points.push([x,y])
    }

    // useEffect(()=>(console.log(points)), [points])

    console.log("d")

    return (
        <div>
            <div>
                {colors.map((color, idx)=>(
                    <button className="cluster-color" style={{
                        backgroundColor: color,
                        borderRadius: "50%",
                        display: "inline-block",
                        height: "20px",
                        width: "20px",
                        margin: "5px"
                    }} onClick={()=>(setCluster(idx))}/>
                ))}
            </div>
            <div className="interactive-graph" onMouseUp={handleDocumentMouseUp} onMouseDown={handleDocumentMouseUp}>
                {[...Array(graph_size.x_lim)].map((_, y) => (
                    <div className="interactive-graph-row">
                        {[...Array(graph_size.y_lim)].map((_, x) => (
                            <Point x={x} y={y} addPoint={addPoint} color={colors[cluster]} mouseDown={mouseDown}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InteractiveGraph;
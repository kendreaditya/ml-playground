import Point from './point';
import React, {useEffect, useState} from 'react';
import './interactive_graph.css';

const InteractiveGraph = () => {
    const [mouseDown, setMouseDown] = useState(false);
    const [points, setPoints] = useState([]);
    const [cluster, setCluster] = useState(0);
    const colors = ["#60A6F3", "#F7BD28"];
    const points_max = 250;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function addPoint(event, onClick=false) {
        if((mouseDown || onClick) && points.length < points_max)
            setPoints([...points, [event.pageX, event.pageY, cluster]])
    }

    return (
        <div>
            <div className="colors">
                {colors.map((color, idx)=>(
                    <button className="color" style={{backgroundColor: color}} onClick={()=>(setCluster(idx))}></button>
                ))}
                <label>{points.length}/{points_max}</label>
            </div>
            <span className="interactive-graph" onMouseDown={()=>setMouseDown(true)} onMouseUp={()=>setMouseDown(false)} onMouseMove={addPoint} onClick={event => addPoint(event, true)}>
                {points.map(([x, y, cluster])=>{
                    console.log(x,y);
                    return (
                        <span className="point" style={{
                            backgroundColor: colors[cluster],
                            left: x,
                            top: y
                        }}/>
                    )
                })}
            </span>
        </div>
    )
}

export default InteractiveGraph;
import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { colors } from '../../consts';
import { Scatter } from './ScatterPlot'
import './visualizations.css';
import '../../index.css'

const InteractiveGraph = ({onDatasetChange}) => {
    const [mouseDown, setMouseDown] = useState(false);
    const [scatterPlots, setScatterPlots] = useState({data: [[{x: 0, y: 0}]], count: 0})
    const [cluster, setCluster] = useState(0);
    const points_max = 500;

    onDatasetChange(scatterPlots.data)

    const [w, h] = [320, 320];

    const margin = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
    
    const width = w - margin.right - margin.left,
        height = h - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain([0, width])
        .range([-5, 5]);

    const yScale = scaleLinear()
        .domain([height, 0])
        .range([-5, 5]);


    const addPoint = (evt, onClick=false) => {
        if((mouseDown || onClick) && scatterPlots.count < points_max) {
        

            var e = evt.target;
            var dim = e.getBoundingClientRect();
            var x = evt.clientX - dim.left;
            var y = evt.clientY - dim.top;

            setScatterPlots(previousPlot => {
                    const newPlot = JSON.parse(JSON.stringify(previousPlot))
                    const xy = {x: xScale(x), y: yScale(y)}

                    if(newPlot.data.length-1 >= cluster)
                        newPlot.data[cluster].push(xy)
                    else
                        newPlot.data.push([xy])

                    newPlot.count++
                    return newPlot
                })
            }
    }

    return (<>
        <div className="colors">
            <div className="color-col">
                {colors.map((color, idx) => (
                    <button className="color" style={{ backgroundColor: color }} onClick={() => (setCluster(idx))}></button>
                ))}
                <label id="point-count">{scatterPlots.count}/{points_max}</label>
            </div>
            <div className="color-col">
                <button id="reset-button" onClick={() => setScatterPlots({data: [[{x: 0, y: 0}]], count: 0})}>Reset</button>
            </div>
        </div>
        <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "20em" }}>
            <svg width={w} height={h} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} onMouseMove={addPoint} onClick={event => addPoint(event, true)} onMouseLeave={event => setMouseDown(false)} style={{overflow: "visible"}}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <Scatter data={scatterPlots.data} colors={colors} w={w} h={h} margin={margin}/>
            </g>
            </svg>
        </div>
    </>)
}

export default InteractiveGraph;
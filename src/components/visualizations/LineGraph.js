import React from "react";
import { scaleLinear } from 'd3-scale';
import { line, curveNatural } from "d3-shape";
import { extent } from 'd3-array';
import { YAxis, XAxis } from './Axis'

// https://github.com/mmmaaatttttt/personal-site/blob/4e78b7dc7ea0e16995406803d961ab6271e980d4/src/story_components/atoms/LinePlot/index.js
const LineGraph = ({ x=[10, 9, 8], w=320, h=320/2, margin={ top: 5, bottom: 5, left: 5, right: 5 }, color, domain=null}) => {
    const width = w - margin.right - margin.left,
        height = h - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain([0, x.length])
        .range([0, width]);

    const yScale = scaleLinear()
        .domain((domain===null ? extent(x.flat(), d=>d) : domain))
        .range([height, 0]);

    const linePath = line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(curveNatural);
    
    const data = x.map((x_i, i) => ({x: i, y: x_i}))

    return (
        <>
            <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "10em" }}>
                <svg width={w} height={h} style={{position: "absolute", zIndex: 2}} style={{overflow: "visible"}}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        <YAxis yScale={yScale} width={width} lines={false} textPadding={-30}/>
                        <path
                            d={linePath(data)}
                            strokeWidth={3}
                            stroke={color}
                            fill="none"
                        />
                    </g>
                </svg>
            </div>
        </>
    );
}

export default LineGraph;
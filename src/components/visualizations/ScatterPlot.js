import React from 'react';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import './../interactive_graph/interactive_graph.css'

export const Point = ({x, y, color, key}) => {
  return (
    <circle className="point"
        key={key}
        r={5}
        cx={x}
        cy={y}
        style={{ fill: color}}
        stroke="white" stroke-width="1.5"
    />)
}

export const Scatter = ({data, w, h, margin, colors}) => {

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data.flat(), d => d.x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data.flat(), d => d.y))
    .range([height, 0]);


  const points = data.reduce((points, cluster, cluster_i) => {

    cluster.map((point) => {
      points.push(<Point x={xScale(point.x)} y={yScale(point.y)} color={colors[cluster_i]} key={points.length}/>)
    })

    return points;
  }, []);

  return (
        <g transform={`translate(${margin.left},${margin.top})`}>
          {points}
        </g>
  );
}

export default Scatter;
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { YAxis, XAxis } from './Axis'

// https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7
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

export const Scatter = ({data, w, h, margin, colors, domain = {x: [-5, 5], y: [-5, 5], scale: false}}) => {

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain((domain.scale ? extent(data.flat(), d=>d.x) : domain.x))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain((domain.scale ? extent(data.flat(), d=>d.y) : domain.y))
    .range([height, 0]);

  const points = data.reduce((points, cluster, cluster_i) => {

    cluster.map((point) => {
      points.push(<Point x={xScale(point.x)} y={yScale(point.y)} color={colors[cluster_i]} key={points.length}/>)
    })

    return points;
  }, []);

  return (
          <>
            <YAxis yScale={yScale} width={width} />
            <XAxis xScale={xScale} height={height} />
            {points}
          </>
  );
}

export default Scatter;
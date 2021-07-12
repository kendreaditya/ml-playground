import React from 'react';
import { Scatter } from './ScatterPlot'
import { colors } from '../../consts';
import ContourMap from './ContourMap';


const ContourScatter = ({points, meshgrid}) => {

  const margin = {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }

  var scatterPlots = points.x.reduce((clusters, x, i) => {
    clusters[points.y[i]].push({
      x: x[0],
      y: x[1]
    })

    return clusters
  }, Array.from(Array(Math.max(...points.y)+1), () => []));

  
  return (
    <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "20em" }}>
      <ContourMap meshgrid={meshgrid} w={320} h={320} margin={margin} style={{position: "absolute", zIndex: 1}}/>
      <svg width={320} height={320} style={{position: "absolute", zIndex: 2, overflow: "visible"}}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Scatter data={scatterPlots} colors={colors} w={320} h={320} margin={margin}/>
        </g>
      </svg>
    </div>
  )
}

export default ContourScatter;
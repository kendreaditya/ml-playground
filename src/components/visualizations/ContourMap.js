import React from 'react';
import { Scatter } from './ScatterPlot'
import { colors } from '../../consts';


const ContourMap = ({points, meshgrid}) => {
  console.log(meshgrid)

  var scatterPlots = points.x.reduce((clusters, x, i) => {
    clusters[points.y[i]].push({
      x: x[0],
      y: x[1]
    })

    return clusters
  }, Array.from(Array(Math.max(...points.y)+1), () => []));

  
  return (
    <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "20em" }}>
      <svg width={320} height={320}>
        <Scatter data={scatterPlots} colors={colors} w={320} h={320} margin={{
            top: 40,
            bottom: 40,
            left: 40,
            right: 40
          }}
          style={{
            position: "absolute"
          }} 
        />
      </svg>
    </div>
  )
}

export default ContourMap;
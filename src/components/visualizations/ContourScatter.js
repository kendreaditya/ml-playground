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

  if(!points || points.length === 0)  {
    var scatterPlots = [];
  } else { 
    var scatterPlots = [["x_train", "y_train"],["x_test", "y_test"]].reduce((clusters, [x_key, y_key], idx) => {
      points[x_key].map((point, point_idx) => {
        clusters[points[y_key][point_idx] + (idx===1?2:idx)].push({x: point[0], y: point[1]})
      })
      return clusters
    }, [[], [], [], []])

  }

  
  return (
    <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "20em" }}>
      <ContourMap meshgrid={meshgrid} w={320} h={320} margin={margin} style={{position: "absolute", zIndex: 1}}/>
      <svg width={320} height={320} style={{position: "absolute", zIndex: 2, overflow: "visible"}}>
        <defs>
            <filter id="blur">
                <feGaussianBlur stdDeviation="50" />
            </filter>
        </defs>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Scatter data={scatterPlots} colors={colors} w={320} h={320} margin={margin}/>
        </g>
      </svg>
    </div>
  )
}

export default ContourScatter;
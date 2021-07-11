import React from "react";
import { Scatter } from './ScatterPlot';
import { colors } from '../../consts';


const TSNE = ({ points }) => {

    const margin = {
                top: 5,
                bottom: 30,
                left: 30,
                right: 5
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
      <svg width={320} height={320}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            <Scatter data={scatterPlots} colors={colors} domain="auto" w={320} h={320} margin={margin}
            style={{
                position: "absolute"
            }} 
            />
        </g>
      </svg>
    </div>
  )

}

export default TSNE;
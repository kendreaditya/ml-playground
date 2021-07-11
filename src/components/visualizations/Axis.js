import React from "react";

// https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7
export const YAxis = ({ yScale, width }) => {
    const textPadding = -20;

    const axis = yScale.ticks(5).map((d, i) => (
        <g key={i} className="y-tick">
        {/* <line
            style={{ stroke: "#e4e5eb" }}
            y1={yScale(d)}
            y2={yScale(d)}
            x1={0}
            x2={width}
        /> */}
        <text
            style={{ fontSize: 12 }}
            x={textPadding}
            dy=".32em"
            y={yScale(d)}
        >
            {d}
        </text>
    </g>
  ));
  return <>{axis}</>;
}

export const XAxis = ({ xScale, height}) => {
    const textPadding = 10;

    const axis = xScale.ticks(10).map((d, i) => (
        <g className="x-tick" key={i}>
            {/* <line
                style={{ stroke: "#e4e5eb" }}
                y1={0}
                y2={height}
                x1={xScale(d)}
                x2={xScale(d)}
            /> */}
            <text
                style={{ textAnchor: "middle", fontSize: 12 }}
                dy=".71em"
                x={xScale(d)}
                y={height + textPadding}
            >
                {d}
            </text>
        </g>
    ));
  return <>{axis}</>;
}

import React from "react";

// https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7
export const YAxis = ({ yScale, width, textPadding=-15, lines=true }) => {

    const axis = yScale.ticks(8).map((d, i) => (
        <g key={i} className="y-tick">
            {d===0 && lines ? 
            <line
                style={{ stroke: "#e4e5eb" }}
                y1={yScale(d)}
                y2={yScale(d)}
                x1={0}
                x2={width}
            /> : null}

            {i===0 && lines ? 
            <line
                style={{ stroke: "#e4e5eb" }}
                y1={width}
                y2={width}
                x1={0}
                x2={width}
            /> : null}

            <line
                style={{ stroke: "#e4e5eb" }}
                y1={yScale(d)}
                y2={yScale(d)}
                x1={-7.5}
                x2={0}
            />

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

export const XAxis = ({ xScale, height, textPadding=10}) => {

    const axis = xScale.ticks(8).map((d, i) => (
        <g className="x-tick" key={i}>
            {d===0 ?
            <line
                style={{ stroke: "#e4e5eb" }}
                y1={0}
                y2={height}
                x1={xScale(d)}
                x2={xScale(d)}
            /> : null}

            {i===0 ? 
            <line
                style={{ stroke: "#e4e5eb" }}
                y1={0}
                y2={height}
                x1={0}
                x2={0}
            /> : null}


            <line
                style={{ stroke: "#e4e5eb" }}
                y1={height}
                y2={height+7.5}
                x1={xScale(d)}
                x2={xScale(d)}
            />

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


import React from "react";
import { Chart } from "react-charts";

const LossGraph = ({ loss }) => {
    const data = [{
        label: "loss",
        data: loss.map((value, idx) => ({
            "primary": idx,
            "secondary": value 
        }))
    }];

    const series = { showPoints: false};

    const axes = [{
        primary: true,
        type: "linear",
        position: "bottom"
    }, {
        type: "linear",
        position: "left"
    }];

    return (
        <>
            <div className="container" style={{ "background": "#FFFFFF", "width": "20em", "height": "10em" }}>
                <Chart data={data} series={series} axes={axes} />
            </div>
        </>
    );
}

export default LossGraph;
import React from 'react';
import {rgb, range} from 'd3';
import { scaleLinear, scaleQuantize } from 'd3-scale';

const ContourMap = ({ meshgrid, w, h , margin}) => {

    const drawContour = (canvas) => {
        if(!canvas || meshgrid.length === 0)
            return;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(w, h);

        let tmpScale = scaleLinear()
            .domain([0, .5, 1])
            .range(["#DC7C71", "white", "#7EA0FB"])
            .clamp(true);
        let shades = range(0, 1 + 1E-9, 1 / 255).map(a => {
            return tmpScale(a);
        });
        let colorScale = scaleQuantize()
            .domain([0, 1])
            .range(shades)
        
        for (let y = 0, p = -1; y < h; ++y) {
            for (let x = 0; x < w; ++x) {
                let value = meshgrid[x][y];

                let c = rgb(colorScale(value));
                imageData.data[++p] = c.r;
                imageData.data[++p] = c.g;
                imageData.data[++p] = c.b;
                imageData.data[++p] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    return (
        <>
            <canvas ref={canvas=>drawContour(canvas)} height={h} width={w}
            style={{position: "absolute", 
                zIndex: 1,
                marginTop: margin.top,
                marginBottom: margin.bottom,
                marginLeft: margin.left,
                marginRight: margin.right,
                borderRadius: 10,
                }}
            />
        </>
    )
}

export default ContourMap;
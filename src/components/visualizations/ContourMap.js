import React, { useEffect, useRef, useContext, useState } from 'react';

const ContourMap = ({ meshgrid, w, h , margin}) => {

    const drawContour = (canvas) => {
        if(!canvas || meshgrid.length === 0)
            return;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(285, 285);

        // Iterate through every pixel
        let m = 0
        for (let i = 0; i < imageData.data.length; i += 4) {
            // Modify pixel data
            if ((meshgrid[parseInt(m)][2] > 0.5)) { 
                imageData.data[i + 0] = 126;  // R value
                imageData.data[i + 1] = 160;    // G value
                imageData.data[i + 2] = 251;  // B value
                imageData.data[i + 3] = 255;  // A value
            }
            else {
                imageData.data[i + 0] = 233;  // R value
                imageData.data[i + 1] = 121;    // G value
                imageData.data[i + 2] = 111;  // B value
                imageData.data[i + 3] = 255;  // A value
            }
            if(meshgrid.length-1 > m)
                m += 0.5
            else
                break
        }

        console.log("lol")

        // Draw image data to the canvas
        ctx.putImageData(imageData, 0, 0);
    }

    return (
        <>
            <canvas ref={canvas=>drawContour(canvas)} height={285} width={285}
            style={{position: "absolute", 
                zIndex: 1,
                marginTop: margin.top,
                marginBottom: margin.bottom,
                marginLeft: margin.left,
                marginRight: margin.right
                }}
            />
        </>
    )
}

export default ContourMap;
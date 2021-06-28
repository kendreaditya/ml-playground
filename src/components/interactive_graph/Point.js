import React from 'react';

const Point = ({x, y, color}) => {
    return (
        <span className="point" style={{
            backgroundColor: color,
            left: x,
            top: y
        }}/>
    )
}

export default Point;
import React, {useState} from 'react';

const Point = ({x, y, addPoint, color, mouseDown}) => {
    const [isPoint, setIsPoint] = useState(false);
    
    const onPoint = (event, onClick=false) => {
        if((!isPoint && mouseDown) || (!isPoint && onClick)) {
            event.target.checked = true;
            setIsPoint(true);
            addPoint(x, y);
        }
    }

    return (
        // <input className="point" type="checkbox" onMouseOver={event=>(onPoint(event))} onClick={event=>(onPoint(event, true))}/>
        <span className="point" style={isPoint ? {
            backgroundColor: color,
            borderRadius: "50%",
        } : {}} onMouseOver={event=>(onPoint(event))} onClick={event=>(onPoint(event, true))}/>
    );
};

export default Point;



//         <input className="point" type="checkbox" style={isPoint ? {backgroundColor: color} : {}} onMouseOver={event=>(onPoint(event))} onClick={event=>(onPoint(event, true))}/>
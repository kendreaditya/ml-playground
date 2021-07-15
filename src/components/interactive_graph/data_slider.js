import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const DatasetSlider = ({onSplitChange}) => {
  const [value, setValue] = React.useState(80);
  onSplitChange(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="container dataset-slider">
        Training Data Split
        <div className="slider">
          <Slider id="slider" className="slider-col" value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
          <input className="slider-col" type="text" value={value} style={{width: "50px"}}/>
        </div>
    </div>
  );
}

export default DatasetSlider;
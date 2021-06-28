import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const DatasetSlider = () => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="dataset-slider">
        <Typography id="continuous-slider" gutterBottom>
            Data Split
        </Typography>
        <Grid container spacing={1}>
            <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
                <input type="text" value={value}/>
            </Grid>
        </Grid>
    </div>
  );
}

export default DatasetSlider;
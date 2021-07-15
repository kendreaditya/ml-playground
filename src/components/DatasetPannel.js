import React from "react";
import InteractiveGraph from './visualizations/InteractiveScatter'
import DatasetSlider from "./interactive_graph/data_slider";

const DatasetPannel = ({onDatasetChange, onSplitChange}) => {

  return (<>
        <InteractiveGraph onDatasetChange={onDatasetChange}/>
        <DatasetSlider onSplitChange={onSplitChange}/>
    </>
  )
}

export default DatasetPannel;
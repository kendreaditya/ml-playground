import React from "react";
import InteractiveGraph from './visualizations/InteractiveScatter'

const DatasetPannel = ({onDatasetChange}) => {
  return (<>
        <InteractiveGraph onDatasetChange={onDatasetChange}/>
    </>
  )
}

export default DatasetPannel;
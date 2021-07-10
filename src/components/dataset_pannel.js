import React, { useEffect, useState } from "react";
import InteractiveGraph from './interactive_graph/interactive_graph'
import DataSlider from './interactive_graph/data_slider'

const DatasetPannel = () => {
  return (<>
        <InteractiveGraph />
        <DataSlider />
    </>
  )
}

export default DatasetPannel;

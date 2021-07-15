import ReactDOM from 'react-dom';
import React from "react";
import DatasetPannel from './components/DatasetPannel';
import ResultsPannel from './components/ResultsPannel';
import Parameters from './components/ModelParameters';
import './index.css';

const App = () => {
  // Not using useState as I don't want to relod the app on every change
  var dataset;
  var parameters;
  var split;
  
  const setDataset = (newDataset) => dataset=newDataset;
  const setParameters = (newParameters) => parameters=newParameters;
  const setSplit = (newSplit) => split=newSplit;

  const getDataset = () => dataset;
  const getParameters = () => parameters;
  const getSplit = () => split;
  
  return (<>
    <h1>Machine Learning Playground</h1>
    <div id="flex-container">
      <div id="dataset-item" className="col">
        <DatasetPannel onDatasetChange={setDataset} onSplitChange={setSplit}/>
      </div>
      <div id="parameter-item" className="col">
        <Parameters onParameterChange={setParameters}/>
      </div>
      <div id="results-item" className="col">
        <ResultsPannel getDataset={getDataset} getParameters={getParameters} getSplit={getSplit}/>
      </div>
    </div>
  </>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root'));
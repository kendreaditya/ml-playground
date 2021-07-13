import ReactDOM from 'react-dom';
import React, {useEffect} from "react";
import DatasetPannel from './components/DatasetPannel';
import ResultsPannel from './components/ResultsPannel';
import Parameters from './components/ModelParameters';
import './index.css';
import { modelParameters } from './communication/api';

const App = () => {

  const modelParams = () => {
    return modelParameters() 
  }

  return (<>
    <h1>Machine Learning Playground</h1>
    <div id="flex-container">
      <div id="dataset-item" className="col">
        <DatasetPannel/>
      </div>
      <div id="parameter-item" className="col">
        <Parameters parameters={modelParams()}/>
      </div>
      <div id="results-item" className="col">
        <ResultsPannel/>
      </div>
    </div>
  </>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root'));
import ReactDOM from 'react-dom';
import React from "react";
import DatasetPannel from './components/DatasetPannel';
import ResultsPannel from './components/ResultsPannel';
import Parameters from './components/ModelParameters';
import './index.css';

const App = () => {

  return (<>
    <h1>Machine Learning Playground</h1>
    <div id="flex-container">
      <div id="dataset-item" className="col">
        <DatasetPannel/>
      </div>
      <div id="parameter-item" className="col">
        <Parameters/>
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
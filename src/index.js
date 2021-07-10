import ReactDOM from 'react-dom';
import React from "react";
import DatasetPannel from './components/dataset_pannel';
import ResultsPannel from './components/results_pannel';
import Parameter from './components/parameters';
import './index.css';

const App = () => {

  return (<>
    <h1>Machine Learning Playground</h1>
    <div id="flex-container">
      <div id="dataset-item" className="col">
        <DatasetPannel/>
      </div>
      <div id="parameter-item" className="col">
        <Parameter/>
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
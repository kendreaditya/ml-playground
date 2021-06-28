import ReactDOM from 'react-dom';
import InteractiveGraph from './components/interactive_graph/interactive_graph'
import DataSlider from './components/interactive_graph/data_slider'
import './index.css'

const Hyperprameter = () => {
  return (<>
    <div className="container parameter" style={{ "background": "#FFFFFF" }}>
    </div>
  </>)
}

const Graph = () => {
  return (<>
    <div className="container graph" style={{ "background": "#FFFFFF" }}>
    </div>
  </>)
}

const App = () => {
  return (<>
    <h1>Machine Learning Playground</h1>
    <div id="flex-container">
      <div id="dataset-item" className="col">
        <InteractiveGraph />
        <DataSlider />
      </div>
      <div id="parameter-item" className="col">
        <Hyperprameter />
      </div>
      <div id="results-item" className="col">
        <Hyperprameter />
        <Graph />
        <Graph />
      </div>
    </div>
  </>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root'));
import ReactDOM from 'react-dom';
import InteractiveGraph from './components/interactive_graph/interactive_graph'

const App = () => {
  return (
    <InteractiveGraph/>
  )
}

ReactDOM.render(
  <App/>, document.getElementById('root'));
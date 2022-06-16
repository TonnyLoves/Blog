import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector, useStore } from 'react-redux';

function App(props) {
  const dispatch = useDispatch()
  const counter = useSelector((state) => {
    return state.counter
  })
  return (
    <div 
      className="App" 
      style={{ 
        backgroundColor: "red",
        height: '100px',
        display: 'block',
      }}
      onClick={() => dispatch({type: "add"})}
    >
      <div>{counter}</div>
    </div>
  );
}

export default App;

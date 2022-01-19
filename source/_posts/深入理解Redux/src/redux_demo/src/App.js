import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactReduxContext } from 'react-redux';
import { useContext } from 'react'
// import { useStore } from 'react-redux';
function App() {
  const dispatch = useDispatch()
  const counter = useSelector((state) => {
    return state.counter
  })
  // const store = useStore()
  // const { store } = useContext(ReactReduxContext)


  return (
    <div className="App">
      <text>{`${counter}`}</text>
      <button onClick={ () => {
        dispatch({ type : 'add' })
      }}>按钮</button>
    </div>
  );
}

export default App;

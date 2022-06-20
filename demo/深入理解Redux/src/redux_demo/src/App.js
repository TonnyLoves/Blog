import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactReduxContext } from 'react-redux';
import { useContext, useState } from 'react'
// import { createStoreHook } from 'react-redux';
// import { useStore } from 'react-redux';
function App() {
  // const dispatch = useDispatch()
  // const counter = useSelector((state) => {
  //   return state.counter
  // })
  // const store = useStore()
  const { store } = useContext(ReactReduxContext)
  const dispatch = store.dispatch
  // const counter = store.getState().counter
  const [counter, setCounter] = useState(0)
  return (
    <div className="App">
      <text>{`${counter}`}</text>
      <button onClick={ () => {
        dispatch({ type : 'add' })
        setCounter(store.getState().counter)
      }}>按钮</button>
    </div>
  );
}

App.contextType = ReactReduxContext

export default App;

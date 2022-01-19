import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const counter = useSelector((state) => {
    return state.counter
  })
  return (
    <div className="App">
      <text>{`${counter}`}</text>
      <button onClick={ () => {
        dispatch({type:"add"})
      }}>按钮</button>
    </div>
  );
}

export default App;

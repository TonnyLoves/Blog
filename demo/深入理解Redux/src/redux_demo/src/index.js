import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ReactReduxContext } from 'react-redux';
import Counter from './exmpale/stateMangement';
import thunk from 'redux-thunk';
import AsyncAction from './exmpale/AsyncAction';
import MiddlewareDemo from './exmpale/MiddlewareDemo';

const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer = createStore => (reducer, initialState, enhancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = round(end - start)

    console.log("reducer process time:", diff)

    return newState
  }
  return createStore(monitoredReducer, initialState, enhancer)
}

// 初始状态
const proloadedState = {
  counter: 1,
  addTwo: 2,
}
// reducer方法
function sleep (time) {
  new Promise((resolve) => setTimeout(resolve, time));
}
const counter = (state, action) => {
  // sleep(500).then(() => {
    if (action.type == "add") {
      return state + 1
    }
    return parseInt(state)
  // })
}
const addTwo = (state, action) => {
  // sleep(500).then(() => {
    if (action.type == "two") {
      return state + 2
    }
    return parseInt(state)
  // })
}

const reducers = combineReducers({
  counter,
  addTwo
});   

const store = createStore(reducers, proloadedState, monitorReducerEnhancer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} context={ ReactReduxContext }>
      {/* <App /> */}
      {/* <Counter /> */}
      {/* <AsyncAction /> */}
      <MiddlewareDemo />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ReactReduxContext } from 'react-redux';
import Counter from './exmpale/stateMangement';

// 初始状态
const proloadedState = {
  counter: 1,
}
// reducer方法
const counter = (state, action) => {
  if (action.type === "add") {
    return state + 1
  }
  return state - 1
}

const reducers = combineReducers({
  counter
});   

const store = createStore(reducers, proloadedState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} context={ ReactReduxContext }>
      {/* <App /> */}
      <Counter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

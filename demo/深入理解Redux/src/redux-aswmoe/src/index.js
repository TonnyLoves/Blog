import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const preloadState = {
  counter: 1
};

// reducer： 函数（state, action） => nweState
const reducer = (state, action) => {
  if (action.type === "add") {
    return { counter: state.counter + 1 }
  } else {
    return { counter: state.counter - 1 }
  }
}

const store = createStore(reducer, preloadState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

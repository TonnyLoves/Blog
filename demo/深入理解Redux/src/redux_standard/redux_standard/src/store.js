import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from "./reducer";


const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer =
  createStore => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = performance.now()
      const newState = reducer(state, action)
      const end = performance.now()
      const diff = end - start

      console.log('reducer process time:', diff)

      return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
}

const composedEnhancer = composeWithDevTools(
    monitorReducerEnhancer,
    applyMiddleware(thunk)
)

const store = createStore(rootReducer, composedEnhancer)
export default store
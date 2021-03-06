---
title: 深入理解Redux
date: 2021-12-10 15:20:47
tags:
---

## 什么是Redux？

Redux是JS应用的状态容器，提供可预测的状态管理，主要有以下4个特性：

***可预测*** : Redux让你开发出行为稳定可预测、可运行在不同环境，且易于测试的应用。

***集中管理*** : 集中管理应用的状态和逻辑可以让你卡发出强大的功能；如撤销/重做、状态持久还等

***可调式*** : Redux DevTools 让你轻松追踪到 应用的状态在何时、何处以及如何改变。Redux 的架构让你记下每一次改变，借助于 "时间旅行调试"，你甚至可以把完整的错误报告发送给服务器。

***灵活*** : Redux 可与任何 UI 层框架搭配使用，并且有 庞大的插件生态 来实现你的需求.

## Redux 术语和概念

### Action 与 Action Creator

action 是一个具有type字段的普通JavaScript对象，你可以将 action 视为描述应用程序中发生了什么的事件.
action其实包含两部分:
1. type: 是一个字符串，给这个action一个描述性的名字。一般的格式"域/事件名称"， 域：表示action所属的特征或者类别，事件名称：用来描述发生的具体事情。
2. payload: 携带信息

创建Action的两种方式
```
    const addTodoAction = {
        type: 'todos/todoAdded',
        payload: 'Buy milk'
    }

    const addTodo = text => {
        return {
            type: 'todos/todoAdded',
            payload: text
        }
    }
```
### Reducer

reducer是一个函数，接收当前的**state**和一个**action**对象。必要时决定如何更新状态，并返回新的状态。函数签名：(state, action) => newState。你可以将reducer视为一个事件监听器，它根据接收到action（事件）类型处理事件。

```
    const initalState = { value: 0 }

    function counterReducer(state = initialState, action) {
        // 检查reducer 是否关心这个 action
        if (action.type === 'counter/increment') {
            return {
                ...state,
                value: state.value + 1
            }
        }
        return state
    }
```

### Store

当前Redux应用的状态存在于一个名为store的对象中。 这个store会根据context在整个视图树中。

store对象包含以下几个方面内容：

1. dispath：触发一个 action 事件。更新**state**的唯一方法是调用 store.dispatch , 并传入有个action对象。store 将执行所有 reducer 函数并计算出更新后的 state，调用 getState() 可以获取新 state。
```
    // 函数组件
    let dispatch = useDispatch()
    dispatch(action)

    // class组件
    store.dispatch(action)

    dispath 主要有两个任务: 
    1. 执行reducer, reducer的控制过程，会执行所有的reducer，并通过action.type来筛选，具体的reducer执行代码.
    2. 执行subscribe，执行所有的订阅者。
```

2. getState()：返回当前的state. 以同步方式调用它调用store 的 redue 函数
```
    store.getState()
```
3. subscribe(listener)：添加一个变化监听器。每当dispatch action的时候就会执行，state树中的一部分可能已经变化。可以使用getState() 来拿到当前state.
```
    listener: 每当dispatch action 的时候都会执行的回调。state树中的一部分可能已经变化。你可以在回调函数里面调用getState() 来拿到当前state。store的reducer应该是纯函数，因此你可能需要对state树中的引用做深度比较来确定它的值是否有变化。
```

4. replaceReducer(nextReducer): 替换当前使用的Reducer函数

## 异步Action与异步数据流

每当 dispatch action 时，state 会被立即更新，它只有同步操作。之前我们已经探究过同步的Action Creator函数。

```
    const dispatch_s = useDispatch()

    const requestDataAsync = () => {
        fetch("https://www.google.com/search?q=secret+sauce", { mode: 'no-cors' }).then((response)=>{
            console.log("我测试thunk" + response)
            dispatch_s({type: 'add'})
        })
    }

    requestDataAsync()
```

如何把之前定义的同步action创建函数和网络请求结合起来呢？标准的做法是使用 Redux Thunk 中间件。要引入 redux-thunk 这个专门的库才能使用。我们后面会介绍 middleware 大体上是如何工作的；目前，你只需要知道一个要点：通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。

当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

```
    const dispatch = useDispatch()

    const requestData = () => {
        return (dispath, getState) => {
            fetch("https://www.google.com/search?q=secret+sauce", { mode: 'no-cors' }).then((response)=>{
                console.log("我测试thunk" + response)
                dispath({type: 'add'})
            })
        }
    }

    dispatch_s(requestData())
```

## Middleware(中间件)

Middleware用于扩展dispatch函数，提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

Middleware的签名：(dispatch, getState) => next => action

比如日志中间件

```
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default logger
```

## Enhancer（增强件）

Enhancer 用于扩展createStore函数

Enhancer的签名：(createStore) => (reducer, initialState, enhancer)

```
const round = number => Math.round(number * 100) / 100

const monitorReducerEnhancer =
  createStore => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = performance.now()
      const newState = reducer(state, action)
      const end = performance.now()
      const diff = round(end - start)

      console.log('reducer process time:', diff)

      return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
  }

export default monitorReducerEnhancer
```

## Middleware 与 Enhancer的区别？

大多数的应用都会使用 middleware 或 enhancer 来拓展 Redux store 的功能。（注：middleware 很常见，enhancer 不太常见） middleware 拓展了 Redux dispatch 函数的功能；enhancer 拓展了 Redux store 的功能。

## Redux Toolkit（工具类）

Redux Toolkit 是官方的，有观点的，开箱即用的高效 Redux 开发工具集。它旨在成为标准的Redux逻辑开发方式，我们强烈建议使用它。

Redux Toolkit包含：

> configureStore(): 提供简化的配置选项。他可以自动组合切片slice的reducer，添加你提供的任何Redux中间件，默认情况下包含redux-thunk，并启用Redux DevTools扩展。

> createReducer(): 让你自动做 action type到reducer的对应，而不是编写switch...case语句。另外会自动使用 immer 库来让你使用普通的mutable代码编写更简单的 immutale更新。例如 state.todos[3].completed = true。

> createAction() 返回给定action type字符串的action crateor函数。该函数本身已定义了toString(),因此代替常量类型使用。

> createSlice() 接受一组化reducer函数，一个slice切片名和初始状态inital state,并自动生成具有相应action creator 和 action type 的slice reducer。

> createSelector 来源于 Reselect库，重新export出来以方便使用。

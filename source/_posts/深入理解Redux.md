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

如何把之前定义的同步action创建函数和网络请求结合起来呢？标准的做法是使用 Redux Thunk 中间件。要引入 redux-thunk 这个专门的库才能使用。我们后面会介绍 middleware 大体上是如何工作的；目前，你只需要知道一个要点：通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。

当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。


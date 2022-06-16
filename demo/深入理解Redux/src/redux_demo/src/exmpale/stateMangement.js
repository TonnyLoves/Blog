import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";
import { createStore, combineReducers } from 'redux';

let i = 0
export default function Counter() {
    const store = useStore()
    const dispatch = useDispatch()
    const counter = useSelector((state)=>{
        return state.counter
    })
    console.log("开始")
    // useEffect: 副作用执行, 类似于生命周期方法
    // useEffect做了什么？
    // 需要在渲染后执行某些操作。React会保存你传递的函数，并且在执行DOM更新之后调用它。
    // useEffect会在每次渲染后都执行么？
    // 在默认情况下，它在第一次渲染之后和每次更新之后都执行、使用useEffect调度的effect不会阻塞浏览器更新屏幕

    // 1. 如何能保证useEffect值执行一次
    useEffect(() => { 
        let unsubscribe = store.subscribe(handleValue)
        console.log("userEffect")
        return () => {
            unsubscribe()
        }
    }, [])

    // 2. replaceReducer方法
    // reducer方法
    const newCounter = (state, action) => {
        if (action.type === "add") {
        return state + 2
        }
        return state - 2
    }
    const newReducers = combineReducers({
        newCounter
    })
    store.replaceReducer(newReducers)

    // 3. 如何保证useEffect只在某个特定的状态变化的时候调用 useEffect
    const add = () => {
        dispatch({type: "add"})
        
    }
    const handleValue = () => {
        i++
        console.log(i)
    }
    console.log("end")
    return (
        <div>
            value: {counter} 
            <button 
                onClick={add}
            >
                点击时间
            </button>
        </div>
    )
}
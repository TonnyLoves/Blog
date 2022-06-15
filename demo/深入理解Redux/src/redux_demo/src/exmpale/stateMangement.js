import { useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useStore } from "react-redux";

let i = 0
export default function Counter() {
    const store = useStore()
    const dispatch = useDispatch()
    const counter = useSelector((state)=>{
        return state.counter
    })
    const add = () => {
        dispatch({type: "add"})
    }
    const handleValue = () => {
        i++
        unsubscribe()
        console.log(i)
    }
    const unsubscribe = store.subscribe(handleValue)
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
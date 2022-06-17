import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector, useStore } from "react-redux"

export default function AsyncAction() {
    const store = useStore()
    const dispatch_s = useDispatch()
    const counter = useSelector((state)=>{
        return state.counter
    })
    const requestData = () => {
        return (dispath, getState) => {
            fetch("https://www.google.com/search?q=secret+sauce", { mode: 'no-cors' }).then((response)=>{
                console.log("我测试thunk" + response)
                dispath({type: 'add'})
            })
        }
    }
    // const requestDataAsync = () => {
    //     fetch("https://www.google.com/search?q=secret+sauce", { mode: 'no-cors' }).then((response)=>{
    //         console.log("我测试thunk" + response)
    //         dispatch_s({type: 'add'})
    //     })
    // }
    const add = () => {
        // store.dispatch(requestData())
        // requestDataAsync()
        dispatch_s(requestData())
    }
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


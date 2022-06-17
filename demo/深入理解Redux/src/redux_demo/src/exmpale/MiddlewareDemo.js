import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector, useStore } from "react-redux"

export default function MiddlewareDemo() {
    const store = useStore()
    const dispatch_s = useDispatch()
    const counter = useSelector((state)=>{
        return state.counter
    })
    useEffect(() => {
        store.dispatch = dispatchWithLog2
    })
    const requestData = () => {
        return (dispath, getState) => {
            fetch("https://www.google.com/search?q=secret+sauce", { mode: 'no-cors' }).then((response)=>{
                console.log("我测试thunk" + response)
                dispath({type: 'add'})
            })
        }
    }
    const add = () => {
       // dispatchWithLog()
       dispatch_s(requestData())
    }
    /// 方法1：封装dispatch方法, 异步可能获取不到想要的结果。
    const dispatchWithLog = (action) => {
        console.log("dispatch前: " + store.getState().counter)
        dispatch_s(requestData())
        console.log("dispatch后: " + store.getState().counter)
    }
    /// 方法2：直接替换store的dispatch
    const dispatchWithLog2 = (action) => {
        console.log("dispatch前: " + store.getState().counter)
        let result = dispatch_s(requestData())
        console.log("dispatch后: " + store.getState().counter)
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


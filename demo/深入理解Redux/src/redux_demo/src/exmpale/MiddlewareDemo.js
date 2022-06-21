import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector, useStore } from "react-redux"

export default function MiddlewareDemo() {
    const store = useStore()
    const dispatch_s = useDispatch()
    const counter = useSelector((state)=>{
        return state.counter
    })
    const addTwoCounter = useSelector((state) => {
        return state.addTwo
    })
    const add = () => {
       // dispatchWithLog()
       dispatch_s({type: 'add'})
    }
    const addTwo = () => {
        // dispatchWithLog()
        dispatch_s({type: 'two'})
     }
    return (
        <div>
            value: `{counter} -- {addTwoCounter}`
            <button 
                onClick={add}
            >
                点击+1
            </button>
            <button 
                onClick={addTwo}
            >
                点击+2
            </button>
        </div>
    )
}


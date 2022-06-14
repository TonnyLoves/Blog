import { useState } from "react"

export default function Counter() {
    const [counter, setCounter] = useState(0);
    const add = () => {
        setCounter((counter) => {
            return counter + 2
        })
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
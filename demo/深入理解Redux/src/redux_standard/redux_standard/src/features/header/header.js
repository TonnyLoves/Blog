import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')
    const dispatch = useDispatch()

    const handleChange = (e) => setText(e.target.value)

    const handleKeyDown = async (e) => {
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
            setStatus('loading')
            await dispatch(saveNewTodo(trimmedText))
            setText('')
            setStatus('idle')

            window.webkit.messageHandlers.hideNavi.postMessage({"data": {"hideNavi": false}});
        }  
    }

    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : 'What needs to be done?'
    let loader = isLoading ? <div className="loader"/> : null

    return (
        <header className="header">
            <input
                className=" new-todo"
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={text}
                disabled={isLoading}
            />
            {loader}
        </header>
    )
}

export default Header;
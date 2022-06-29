import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { selectTodoById } from './todosSlice'

const TodoListItem = ({ id }) => {
    let todo = useSelector((state) => {
        return selectTodoById(state, id)
    })
    const {text, completed, color} = todo
    const dispatch = useDispatch()

    const handleCompletedChanged = () => {

    }
    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input 
                        className="toggle"
                        id="toggle"
                        type='checkbox'
                        checked={true}
                        onchange={handleCompletedChanged}
                    />
                    <label for='toggle'>
                        <div className="todo-text">{text}</div>
                    </label>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                    >
                        <option value=""></option>
                    </select>
                    <button className="destroy">
                        <TimesSolid />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
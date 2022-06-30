import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { selectTodoById, todoDeleted, todoToggled } from './todosSlice'

const TodoListItem = ({ id }) => {
    let todo = useSelector((state) => {
        return selectTodoById(state, id)
    })

    const {text, completed, color} = todo

    const dispatch = useDispatch()

    const handleCompletedChanged = () => {
        dispatch(todoToggled(todo.id))
    }

    const onDelete = () => {
        dispatch(todoDeleted(todo.id))
    }
    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input 
                        className="toggle"
                        id={"toggle" + todo.id}
                        type='checkbox'
                        checked={completed}
                        onChange={handleCompletedChanged}
                    />
                    <label htmlFor={"toggle" + todo.id}>
                        <div className="todo-text">{text}</div>
                    </label>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                    >
                        <option value=""></option>
                    </select>
                    <button className="destroy" onClick={onDelete}>
                        <TimesSolid />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoListItem
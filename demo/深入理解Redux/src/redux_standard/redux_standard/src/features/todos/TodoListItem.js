import { ReactComponent as TimesSolid } from './times-solid.svg'

const TodoListItem = ({ id }) => {
    const handleCompletedChanged = () => {

    }
    return (
        <li>
            <div className="view">
                <div className="segment label">
                    <input 
                        className="toggle"
                        type='checkbox'
                        checked={false}
                        onchange={handleCompletedChanged}
                    />
                    <div className="todo-text">{}</div>
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
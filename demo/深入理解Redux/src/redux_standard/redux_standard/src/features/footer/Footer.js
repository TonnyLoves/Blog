import { useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { statusFilterCHanged, StatusFilters } from "../filters/filtersSlice"
import { selectTodos, todoAllCompleted, todoClearedCompleted } from "../todos/todosSlice"

const RemainingTodos = ({ count }) => {
    const suffix = count === 1 ? '' : 's'
    return (
        <div className="todo-count">
            <h5>Remaining Todos</h5>
            <strong>{count}</strong> item{suffix} left
        </div>
    )
}

export const StatusFiltersUI = ({ value: status, onChange }) => {
    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key]
        const handleClick = () => {
            onChange(value)
        }
        return (
            <li key={value}>
                <button onClick={handleClick}>
                    {key}
                </button>
            </li>
        )
    })
    return (
        <div className="filters statusFilters">
          <h5>Filter by Status</h5>
          <ul>{renderedFilters}</ul>
        </div>
    )
}

const Footer = () => {
    const dispatch = useDispatch()

    const onMarkCompletedClicked = () => {
       dispatch(todoAllCompleted())
    }

    const onClearCompletedClicked = () => {
        dispatch(todoClearedCompleted())
    }

    const todosRemaining = useSelector((state) => {
        const uncompletedTodos = selectTodos(state).filter((todo) => !todo.completed)
        return uncompletedTodos.length
    })

    const { status, color  } = useSelector((state) => state.filters)

    const onStatusChange = (status) => dispatch(statusFilterCHanged(status))

    return (
        <footer className="footer">
            <div className="actions">
                <h5>Actions</h5>
                <button className="button" onClick={onMarkCompletedClicked}>
                    Mark All Completed
                </button>
                <button className="button" onClick={onClearCompletedClicked}>
                    Clear Completed
                </button>
            </div>
            <RemainingTodos count={todosRemaining}/>
            <StatusFiltersUI value={status} onchange={onStatusChange}/>
        </footer>
    )
}


export default Footer;

// 记忆化selectors



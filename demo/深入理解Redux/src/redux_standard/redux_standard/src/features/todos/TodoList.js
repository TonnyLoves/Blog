import { useSelector } from "react-redux"
import TodoListItem from "./TodoListItem"
import { selectFilteredTodoIds } from "./todosSlice"

const TodoList = () => {
    const todoIds = useSelector(selectFilteredTodoIds)
    const loadingStatus = useSelector((state) => {
        return state.todos.status
    })
    if (loadingStatus === 'loading') {
        return (
            <div className="todo-list">
                <div className="loader" />
            </div>
        )
    }
    const renderedListItems = todoIds.map((todoid) => {
        return (
            <TodoListItem 
                key={todoid}
                id ={todoid}
            />
        )
    })
    return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
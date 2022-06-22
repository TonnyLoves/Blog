import { useDispatch, useSelector } from "react-redux"

const Footer = () => {
    const dispatch = useDispatch()

    const todosRemaining = useSelector(state => {
        const uncompletedTodos = state.todos.filter(todo => !todo.completed)
        return uncompletedTodos.length
    })
}

// 记忆化selectors


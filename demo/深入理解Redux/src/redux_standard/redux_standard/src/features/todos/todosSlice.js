import { createSelector } from "reselect";
import { client } from "../../api/client";

/// Action Creators

// 1. 从服务器加载待办事项列表
export const todosLoaded = todos => {
    return {
        type: 'todos/todosLoaded',
        payload: todos
    }
}

// 2. 在将其保存到服务器后添加新的待办事项
export function fetchTodos() {
    return async (dipatch) => {
        const response = await client.get('/fakeApi/todos')
        console.log(response.todos)
        dipatch(todosLoaded(response.todos))
    }
}

// 3. 记忆化
export const selectTodos = createSelector(
    state => state.todos,
    todos => todos.map(todo => todo.id)
)

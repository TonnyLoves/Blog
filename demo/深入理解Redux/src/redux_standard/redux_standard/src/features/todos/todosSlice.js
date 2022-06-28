import { createSelector } from "reselect";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";

/// Action Creators

// 1. 加载中
export const todosLoading = () => {
    return {
        type: 'todos/todosLoading'
    }
}
// 2. 从服务器加载待办事项列表
export const todosLoaded = (todos) => {
    return {
        type: 'todos/todosLoaded',
        payload: todos
    }
}

// 2. 在将其保存到服务器后添加新的待办事项
export function fetchTodos() {
    return async (dispatch) => {
        dispatch(todosLoading())
        const response = await client.get('/fakeApi/todos')
        console.log(response.todos)
        dispatch(todosLoaded(response.todos))
    }
}

const initialState = {
    status: 'idle',
    entities: {}
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todosLoading': 
            return {
                ...state,
                status: 'loading'
            }
        case 'todos/todosLoaded':
            const newEntities = {}
            action.payload.forEach(todo => {
                newEntities[todo.id] = todo
            })
            return {
                ...state,
                status: 'idle',
                entities: newEntities
            }
        default:
            break;
    }
    return state
}

/// 记忆化selector方法：相同的输入，得到相同的输出。
const selectTodoEntities = (state) => state.todos.entities
export const selectTodos = createSelector(
    selectTodoEntities,
    (entities) => {
        return Object.values(entities)
    }
)
export const selectTodoIds = createSelector(
    selectTodos,
    (todos) => todos.map((todo) => todo.id)
)
export const selectFilteredTodos = createSelector(
    selectTodos,
    (state) => state.filters,
    (todos, filters) => {
        const { status, colors } = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0) {
            return todos
        }
        const completedStatus = status === StatusFilters.Completed
        return todos.filters((todo) => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)
export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    (todos) => { 
        return todos.map((todo) => {
            return todo.id
        })
     }
)
export const selectTodoById = (state, todoId) => {
    return selectTodoEntities(state)[todoId]
}

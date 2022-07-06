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
// 3. 标记选中
export const todoToggled = (todoId) => {
    return {
        type: 'todos/todoToggled',
        payload: todoId
    }
}
// 4. 删除
export const todoDeleted = (todoId) => {
    return {
        type: 'todos/todoDeleted',
        payload: todoId
    }
}
// 4. 添加
export const todoAdded = (todo) => {
    return {
        type: 'todos/todoAdded',
        payload: todo
    }
}

// 5. 全选
export const todoAllCompleted = () => {
    return {
        type: 'todos/todoAllCompleted'
    }
}

// 6. 清除
export const todoClearedCompleted = () => {
    return {
        type: 'todos/todoClearedCompleted'
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
        case 'todos/todoClearedCompleted':
            const newEntitiesForClearedCompleted ={ ...state.entities }
            Object.values(newEntitiesForClearedCompleted).forEach((todo) => {
                newEntitiesForClearedCompleted[todo.id] = {
                    ...todo,
                    completed: false
                }
            })
            return {
                ...state,
                entities: newEntitiesForClearedCompleted
            }
        case 'todos/todoAllCompleted':
            const newEntitiesForAllCompleted ={ ...state.entities }
            Object.values(newEntitiesForAllCompleted).forEach((todo) => {
                newEntitiesForAllCompleted[todo.id] = {
                    ...todo,
                    completed: true
                }
            })
            return {
                ...state,
                entities: newEntitiesForAllCompleted
            }
        case 'todos/todoAdded':
            const todoForAdded = action.payload
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todoForAdded.id]: todoForAdded
                }
            }
        case 'todos/todoDeleted':
            const newEntitiesForDeleted = { ...state.entities }
            delete newEntitiesForDeleted[action.payload];
            return {
              ...state,
              entities: newEntitiesForDeleted
            }
        case 'todos/todoToggled':
            const todoId = action.payload
            console.log(todoId)
            const todo = state.entities[todoId]
            return {
                ...state,
                entities: {
                  ...state.entities,
                  [todoId]: {
                    ...todo,
                    completed: !todo.completed,
                  },
                },
            }
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
        return todos.filter((todo) => {
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

export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = {text};
        const response = await client.post("/fakeApi/todos", { todo: initialTodo });
        dispatch(todoAdded(response.todo));
    }
}


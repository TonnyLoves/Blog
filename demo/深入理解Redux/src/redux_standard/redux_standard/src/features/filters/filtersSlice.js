export const colorFilterChanged = (color, changeType) => {
    return {
        type: 'filters/colorFilterChanged',
        payload: { color, changeType }
    }
}

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed'
}

const initialState = {
    status: StatusFilters.All,
    colors: [],
}

/// 1. 通过状态过滤
export const statusFilterCHanged = (status) => {
    return {
        type: 'filters/statusFilterChanged',
        payload: status
    }
}

export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                status: action.payload
            }
        }
        default:
            return state
    }
}
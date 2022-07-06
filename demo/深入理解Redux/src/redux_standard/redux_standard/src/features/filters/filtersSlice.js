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
export const statusFilterChanged = (status) => ({
    type: 'filters/statusFilterChanged',
    payload: status,
})

/// 2. 通过颜色
export const colorFilterChanged = (color, changeType) => {
    return {
        type: 'filters/colorFilterChanged',
        payload: { color, changeType }
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
        case 'filters/colorFilterChanged': {
            return {
                
            }
        }
        default:
            return state
    }
}
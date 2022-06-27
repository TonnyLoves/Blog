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

export default function filtersReducer(state = initialState, action) {
    return state
}
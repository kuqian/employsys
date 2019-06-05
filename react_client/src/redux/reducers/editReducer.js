const initialState = {
    isLoading: false,
    error: null,
    initEmployee: {},
    managerlist: []
}
const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_PAGE_LOADING": {
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }
        case "EDIT_PAGE_FAIL": {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case "EDIT_INIT_SUCCESS": {
            return {
                ...state,
                isLoading: false,
                error: null,
                initEmployee: action.data.emp,
                managerlist: action.data.list
            }
        }
        case "EDIT_EMPLOYEE_SUCCESS": {
            return {
                ...state,
                isLoading: false,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}
export default editReducer;
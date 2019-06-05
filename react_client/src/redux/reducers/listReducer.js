const initialState = {
    error: null,
    isLoading: false,
    sortParam: "",
    isAscending: true,
    employeeList: [],
    curPage: 1,
    numPerPage: 8,
    hasMore: true,
    blockScroll: false
};
const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_LOADING": {
            return {
                ...state,
                isLoading: true,
                error: null,
                hasMore: true
            }
        }
        case "GET_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case "INIT_PAGE": {
            return {
                ...state,
                curPage:1,
                employeeList:[]
            }
        }
        case "RESET_EVERYTHING": {
            return {
                ...initialState
            }
        }
        case "GET_LIST_SUCCESS": {   
            return {
                ...state,
                isLoading: false,
                employeeList: [...state.employeeList, ...action.data],
                hasMore: action.more,
                curPage: state.curPage + 1
            }
        }
        case "INIT_GET_LIST_SUCCESS":{
            return{
                ...state,
                isLoading:false,
                employeeList:action.data,
                hasMore: action.more,
                curPage: 2
            }
        }
        case "CHANGE_SORT_PARAM": {
            const newIsAscending = action.sortParam === state.sortParam ? !state.isAscending : true;
            return {
                ...state,
                sortParam: action.sortParam,
                isAscending: newIsAscending
            }
        }
        case "DISABLE_SCROLL": {
            return {
                ...state,
                blockScroll:true
            }
        }
        case "ENABLE_SCROLL":{
            return {
                ...state,
                blockScroll:false
            }
        }
        case "TEST_SORT": {
            const newIsAscending = action.sortParam === state.sortParam ? !state.isAscending : true;
            const newList = [...state.employeeList];
            if (action.sortParam === 'dr') {
                newList.sort((a, b) => {
                    const ret = a.dr.length - b.dr.length;
                    return newIsAscending ? ret : -ret;
                })
            } else if (action.sortParam === 'manager') {
                newList.sort((a, b) => {
                    let ret = 0;
                    if (!a.manager && !b.manager) ret = a.name.localeCompare(b.name);
                    else if (!a.manager) ret = 1;
                    else if (!b.manager) ret = -1;
                    else a.manager.manager_name.localeCompare(b.manager.manager_name);
                    return newIsAscending ? ret : -ret;
                })
            } else {
                newList.sort((a, b) => {
                    const ret = a[action.sortParam].localeCompare(b[action.sortParam]);
                    return newIsAscending ? ret : -ret;
                })
            }
            console.log(action.sortParam);
            console.log(newIsAscending);
            return {
                ...state,
                isAscending: newIsAscending,
                employeeList: newList,
                sortParam: action.sortParam
            }
        }
        default: return state;
    }
}
export default listReducer;
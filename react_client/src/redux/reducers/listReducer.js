const initialState = {
    error: null,
    isLoading: false,
    sortParam: "",
    isAscending: true,
    employeeList:[],
    curPage:1,
    numPerPage: 8,
    hasMore: true
};
const listReducer = (state = initialState, action)=>{
    switch (action.type){
        case "GET_LIST_LOADING":{
            return {
                ...state,
                isLoading:true,
                error: null
            }
        }
        case "GET_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        }
        case "GET_LIST_SUCCESS":{
            return {
                ...state,
                isLoading: false,
                employeeList: [...state.employeeList, ...action.data],
                hasMore: action.more,
                curPage:state.curPage+1
            }
        }
        case "TEST_SORT":{
            const newIsAscending = action.sortParam === state.sortParam?!state.isAscending:true;
            const newList = [...state.employeeList];
            if(action.sortParam === 'dr'){
                newList.sort((a, b)=>{
                    const ret = a.dr.length - b.dr.length;
                    return newIsAscending?ret:-ret;
                })
            }else if(action.sortParam === 'manager'){
                newList.sort((a, b) => {
                    let ret = 0;
                    if(!a.manager && !b.manager)ret = a.name.localeCompare(b.name);
                    else if(!a.manager)ret = 1;
                    else if(!b.manager)ret = -1;
                    else a.manager.manager_name.localeCompare(b.manager.manager_name);
                    return newIsAscending?ret:-ret;
                })
            }else{
                newList.sort((a, b) => {
                    const ret = a[action.sortParam].localeCompare(b[action.sortParam]);
                    return newIsAscending?ret:-ret;
                })
            }
            console.log(action.sortParam);
            console.log(newIsAscending);
            return {
                ...state,
                isAscending:newIsAscending,
                employeeList:newList,
                sortParam: action.sortParam
            }
        }
    }
    return state;
}
export default listReducer;
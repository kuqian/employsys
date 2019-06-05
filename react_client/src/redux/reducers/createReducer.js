const initialState = {
    isLoading: false,
    error:null,
    managerlist:[]
}
const createReducer = (state = initialState, action) => {
    switch(action.type){
        case "CREATE_PAGE_FAIL":{
            return{
                ...state,
                isLoading:false,
                error: action.error
            }
        }
        case "CREATE_PAGE_LOADING":{
            return{
                ...state,
                isLoading:true,
                error:null
            }
        }
        case "CREATE_EMPLOYEE_SUCCESS":{
            return{
                ...state,
                isLoading:false,
                error:null,
                managerlist:[]
            }
        }
        case "CREATE_GETLIST_SUCCESS":{
            return{
                ...state,
                isLoading: false,
                error: null,
                managerlist: action.data
            }
        }
        default:{
            return state;
        }
    }
}
export default createReducer;
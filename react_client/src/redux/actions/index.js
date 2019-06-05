import axios from "axios";
//--------------------------list page actions--------------------------
export const getListLoading = () => {
    return {
        type: "GET_LIST_LOADING"
    }
}
export const getListFail = (error) => {
    return {
        type: "GET_LIST_FAIL",
        error: error
    }
}
export const getListSuccess = (data, more) => {
    return {
        type: "GET_LIST_SUCCESS",
        data: data,
        more: more
    }
}
export const initGetListSuccess = (data, more) => {
    return {
        type: "INIT_GET_LIST_SUCCESS",
        data: data,
        more: more
    }
}
export const changeSortParam = (sortParam) => {
    return {
        type: "CHANGE_SORT_PARAM",
        sortParam: sortParam
    }
}
export const initPage = () => {
    return {
        type: "INIT_PAGE"
    }
}
export const resetEverything = () => {
    return {
        type: "RESET_EVERYTHING"
    }
}
export const disableScroll = () => {
    return {
        type: "DISABLE_SCROLL"
    }
}
export const enableScroll = () => {
    return {
        type: "ENABLE_SCROLL"
    }
}
export const getManager = (manager_id) => {
    return (dispatch) => {
        //dispatch(resetEverything());
        dispatch(getListLoading());
        const queryParams = `?manager_id=${manager_id}`;
        console.log(queryParams);
        axios.get(`http://localhost:8080/api/dev/manager${queryParams}`)
            .then((res) => {
                console.log(res);
                dispatch(initGetListSuccess(res.data, false));
            })
            .catch((error) => {
                console.log("get manager fail");
                console.log(error);
                dispatch(getListFail());
            })
    }
}
export const getDR = (eid) => {
    return (dispatch) => {
        //dispatch(resetEverything());
        dispatch(getListLoading());
        const queryParams = `?eid=${eid}`;
        console.log(queryParams);
        axios.get(`http://localhost:8080/api/dev/dr${queryParams}`)
            .then((res)=>{
                console.log(res);
                dispatch(initGetListSuccess(res.data, false));
            })
            .catch((error)=>{
                console.log("get dr fail");
                console.log(error);
                dispatch(getListFail());
            })
    }
}
export const getList = (searchText, isInit) => {
    return (dispatch, getState) => {
        dispatch(getListLoading());
        if (isInit) {
            dispatch(initPage());
        }
        const { sortParam, isAscending, curPage, numPerPage } = getState().listReducer;
        let queryParams = `?sortparam=${sortParam}&order=${isAscending}`;
        queryParams += `&curpage=${curPage}&numperpage=${numPerPage}&searchtext=${searchText}`;
        console.log(queryParams);
        axios.get(`http://localhost:8080/api/employee${queryParams}`)
            .then((res) => {
                console.log(res.data.docs);
                const more = res.data.page < res.data.pages;
                if (isInit) {
                    dispatch(initGetListSuccess(res.data.docs, more));
                } else {
                    dispatch(getListSuccess(res.data.docs, more));
                }
            })
            .catch((error) => {
                console.log("get list failure");
                console.log(error);
                dispatch(getListFail(error));
            })
    }
}
export const deleteEmployee = (empID, searchText) => {
    return (dispatch) => {
        dispatch(getListLoading());
        axios.delete(`http://localhost:8080/api/employee/${empID}`, {})
            .then((res)=>{
                console.log("delete success");
                dispatch(getList(searchText, true));
            })
            .catch((error) => {
                console.log("delete fail");
                dispatch(getListFail(error));
            })
    }
}
export const testSort = (sortParam) => {
    return {
        type: "TEST_SORT",
        sortParam: sortParam
    }
}
//----------------------------create page actions------------------
export const createPageLoading = () => {
    return {
        type: "CREATE_PAGE_LOADING"
    }
}
export const createPageFail = () => {
    return {
        type: "CREATE_PAGE_FAIL"
    }
}
export const createGestlistSuccess = (data) => {
    return {
        type: "CREATE_GETLIST_SUCCESS",
        data: data
    }
}
export const createEmployeeSuccess = () => {
    return {
        type: "CREATE_EMPLOYEE_SUCCESS"
    }
}
export const createGetList = () => {
    return (dispatch) => {
        dispatch(createPageLoading());
        axios.get("http://localhost:8080/api/dev/managerlist")
            .then((res) => {
                console.log(res.data);
                dispatch(createGestlistSuccess(res.data));
            })
            .catch((error) => {
                dispatch(createPageFail());
                console.log(error);
            })
    }
}
export const createEmployee = (newEmployee, history) => {
    return (dispatch) => {
        dispatch(createPageLoading());
        console.log(newEmployee);
        axios.post("http://localhost:8080/api/employee", newEmployee)
            .then((res) => {
                console.log("create success");
                history.push("/");
            })
            .catch((error) => {
                dispatch(createPageFail());
                console.log(error);
            })
    }
}
//----------------------------edit page actions------------------
export const editPageLoading = () => {
    return{
        type: "EDIT_PAGE_LOADING"
    }
}
export const editPageFail = (error) => {
    return {
        type: "EDIT_PAGE_FAIL",
        error: error
    }
}
export const editInitSuccess = (data) => {
    return {
        type: "EDIT_INIT_SUCCESS",
        data:data
    }
}
export const editInit = (eid, history) => {
    return (dispatch) => {
        //dispatch(editPageLoading());
        dispatch(getListLoading());
        console.log(`http://localhost:8080/api/employee/${eid}`);
        axios.get(`http://localhost:8080/api/employee/${eid}`)
            .then((res)=>{
                console.log(res);
                const initData = {
                    emp:res.data.emp,
                    list:res.data.managerlist
                }
                dispatch(editInitSuccess(initData));
                history.push("/edit");
                //console.log((res.data.emp.start_date.substring(0,10)));
            })
            .catch((error) => {
                console.log(error);
                //dispatch(editPageFail());
                dispatch(getListFail(error));
            })
    }
}
export const editEmployee = (editedEmp, history) => {
    return (dispatch) => {
        dispatch(editPageLoading());
        console.log(`http://localhost:8080/api/employee/${editedEmp._id}`);
        axios.put(`http://localhost:8080/api/employee/${editedEmp._id}`, editedEmp)
            .then((res)=>{
                console.log(res);
                history.push("/");
            })
            .catch((error)=>{
                console.log(error);
                dispatch(editPageFail());
            })
    }
}
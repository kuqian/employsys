import axios from "axios";
export const getListLoading = () => {
    return{
        type:"GET_LIST_LOADING"
    }
}
export const getListFail = (error) => {
    return{
        type:"GET_LIST_FAIL",
        error: error
    }
}
export const getListSuccess = (data, more) => {
    return{
        type:"GET_LIST_SUCCESS",
        data: data,
        more: more
    }
}
export const getList = () => {
    return (dispatch, getState) => {
        dispatch(getListLoading());
        const {sortParam, isAscending, curPage, numPerPage} = getState().listReducer;
        let queryParams = `?sortparam=${sortParam}&order=${isAscending}`;
        queryParams += `&curpage=${curPage}&numperpage=${numPerPage}`;
        console.log(curPage);
        axios.get(`http://localhost:8080/api/employee${queryParams}`)
            .then((res)=>{
                console.log(res.data.docs);
                const more = res.data.page < res.data.pages;
                dispatch(getListSuccess(res.data.docs, more));
            })
            .catch((error)=>{
                console.log("get list failure");
                console.log(error);
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
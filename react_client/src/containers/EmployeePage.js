import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EnhancedTable from '../components/EnhancedTable';
import { getList, testSort, changeSortParam, resetEverything, getManager, getDR, enableScroll, disableScroll, deleteEmployee, editInit } from '../redux/actions'
import { element } from 'prop-types';
class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTextValue: ""
    }
  }
  componentDidMount() {
    console.log("didmount getlist");
    this.props.reset();
    this.props.getList("", true);
  }
  handleSort = (sortParam) => {
    console.log(sortParam);
    this.props.enableScroll();
    this.props.changeSortParam(sortParam);
    this.props.getList(this.state.searchTextValue, true);
  }
  handleLoadMore = () => {
    console.log("loadmore getlist");
    if (!this.props.isLoading && !this.props.blockScroll) {
      console.log("unblocked");
      this.props.getList(this.state.searchTextValue, false);
    } else {
      console.log("blocked getlist");
    }
  }
  handleSearchTextChange = (event) => {
    console.log(event.target.value);
    this.props.enableScroll();
    this.setState({ searchTextValue: event.target.value });
    this.props.getList(event.target.value, true);
  }
  handleCreateEmployee = () => {
    console.log("inside create new");
    this.props.history.push("/create");
  }
  handleRest = () => {
    console.log("inside Reset");
    this.props.reset();
    this.props.getList("", true);
  }
  handleGetManager = (mID) => {
    console.log(`inside handleGetManager: ${mID}`);
    if(mID !== ""){
      this.props.reset();
      this.props.disableScroll();
      this.props.getManager(mID);
    }else{
      console.log("manager empty");
    }
  }
  handleGetDR = (eID) => {
    console.log(`inside handleGetDR: ${eID}`);
    this.props.reset();
    this.props.disableScroll();
    this.props.getDR(eID);
  }
  handleEdit = (empID) => {
    console.log(`inside handleEdit: ${empID}`)
    this.props.editInit(empID, this.props.history);
  }
  handleDelete = (empID) => {
    console.log(`inside handleDelete: ${empID}`);
    this.props.deleteEmployee(empID, this.state.searchTextValue);
  }
  render() {
    const { employeeList, sortParam, isAscending, hasMore } = this.props;
    const { searchTextValue } = this.state;
    return (
      <div className="emppage-container">
        <EnhancedTable
          sortParam={sortParam}
          isAscending={isAscending}
          handleSort={this.handleSort}
          employeeList={employeeList}
          handleLoadMore={this.handleLoadMore.bind(this)}
          hasMore={hasMore}
          searchTextValue={searchTextValue}
          searchTextChange={this.handleSearchTextChange}
          handleCreateEmployee={this.handleCreateEmployee}
          handleRest={this.handleRest}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleGetManager={this.handleGetManager}
          handleGetDR={this.handleGetDR}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    employeeList: state.listReducer.employeeList,
    isLoading: state.listReducer.isLoading,
    error: state.listReducer.error,
    sortParam: state.listReducer.sortParam,
    isAscending: state.listReducer.isAscending,
    hasMore: state.listReducer.hasMore,
    blockScroll: state.listReducer.blockScroll
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getList: (searchText, isInit) => dispatch(getList(searchText, isInit)),
    testSort: (sortParam) => dispatch(testSort(sortParam)),
    changeSortParam: (sortParam) => dispatch(changeSortParam(sortParam)),
    reset: ()=>dispatch(resetEverything()),
    getManager: (manager_id)=>dispatch(getManager(manager_id)),
    getDR: (eid)=>dispatch(getDR(eid)),
    disableScroll: () => dispatch(disableScroll()),
    enableScroll: () => dispatch(enableScroll()),
    deleteEmployee: (empID, searchText) => dispatch(deleteEmployee(empID, searchText)),
    editInit: (eid, history) => dispatch(editInit(eid, history))
  }
}
const EmployeePageWithRouter = withRouter(EmployeePage);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePageWithRouter);
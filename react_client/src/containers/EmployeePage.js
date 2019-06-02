import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EnhancedTable from '../components/EnhancedTable';
import { getList, testSort } from '../redux/actions'
import { element } from 'prop-types';
class EmployeePage extends Component {
  componentDidMount() {
    // console.log("didmount getlist");
    // this.props.getList();
  }
  handleSort = (sortParam) => {
    // console.log(sortParam);
    this.props.testSort(sortParam);
  }
  handleLoadMore = () => {
    console.log("loadmore getlist");
    if(!this.props.isLoading){
      console.log("unblocked");
      this.props.getList();
    }else{
      console.log("blocked getlist");
    }
  }
  render() {
    const { employeeList, sortParam, isAscending, hasMore } = this.props;
    return (
      <div className="emppage-container">
        <EnhancedTable
          sortParam={sortParam}
          isAscending={isAscending}
          handleSort={this.handleSort}
          employeeList={employeeList}
          handleLoadMore={this.handleLoadMore.bind(this)}
          hasMore={hasMore}
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
    hasMore: state.listReducer.hasMore
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => dispatch(getList()),
    testSort: (sortParam) => dispatch(testSort(sortParam))
  }
}
const EmployeePageWithRouter = withRouter(EmployeePage);
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePageWithRouter);
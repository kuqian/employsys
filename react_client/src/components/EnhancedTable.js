import React from 'react';
import Employee from './Employee';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 450,
    marginTop: theme.spacing(3),
    overflow: 'auto'
  },
  table: {
    width: 1600
  },
}));
const EnhancedTable = ({ sortParam, isAscending, handleSort, handleLoadMore, hasMore, employeeList }) => {
  const classes = useStyles();
  const columnTitles = [
    { id: "name", value: "Name" }, { id: "title", value: "Title" }, { id: "sex", value: "Sex" },
    { id: "start_date", value: "Start_Date" }, { id: "office_phone", value: "Office Phone" },
    { id: "cell_phone", value: "Cell Phone" }, { id: "sms", value: "SMS" }, { id: "email", value: "Email" },
    { id: "manager", value: "Manager" }, { id: "dr", value: "# of DR" }
  ];
  return (
    <Paper className={classes.root}>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
        initialLoad={true}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell key="avatar"/>
              {columnTitles.map((ele, index) => {
                return (
                  <TableCell key={ele.id} align="left">
                    {ele.value}
                    <TableSortLabel
                      active={sortParam === ele.id}
                      direction={isAscending ? 'asc' : 'desc'}
                      onClick={() => handleSort(ele.id)}
                    />
                  </TableCell>
                );
              })}
              <TableCell key="edit"/>
              <TableCell key="delete"/>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((ele, index) => {
              return (
                <Employee
                  key={ele._id}
                  employee={ele}
                />
              );
            })}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </Paper>
  );
}
export default EnhancedTable;
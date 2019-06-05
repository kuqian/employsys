import React from 'react';
import Employee from './Employee';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Aux from '../hoc/Aux';
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 0,
    width: '50%'
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const EnhancedTable = (
  { sortParam, isAscending, handleSort, handleLoadMore,
    hasMore, employeeList, searchTextValue, searchTextChange,
    handleCreateEmployee, handleRest,
    handleEdit, handleDelete, handleGetManager, handleGetDR
  }
) => {
  const classes = useStyles();
  const columnTitles = [
    { id: "name", value: "Name" }, { id: "title", value: "Title" }, { id: "sex", value: "Sex" },
    { id: "start_date", value: "Start_Date" }, { id: "office_phone", value: "Office Phone" },
    { id: "cell_phone", value: "Cell Phone" }, { id: "sms", value: "SMS" }, { id: "email", value: "Email" },
    { id: "manager", value: "Manager" }, { id: "dr", value: "# of DR" }
  ];
  return (
    <Aux>
      <TextField
        id="outlined-name"
        label="Search Text"
        className={classes.textField}
        value={searchTextValue}
        onChange={searchTextChange}
        margin="normal"
        variant="outlined"
      />
      <Paper className={classes.root}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
          initialLoad={false}
          threshold={5}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell key="avatar" />
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
                <TableCell key="edit" />
                <TableCell key="delete" />
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList.map((ele, index) => {
                return (
                  <Employee
                    key={ele._id}
                    employee={ele}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleGetManager={handleGetManager}
                    handleGetDR={handleGetDR}
                  />
                );
              })}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </Paper>
      <Button variant="outlined" color="primary" className={classes.button}
        onClick={handleCreateEmployee}
      >
        Add New Employee
      </Button>
      <Button variant="outlined" color="secondary" className={classes.button}
        onClick={handleRest}
      >
        Reset Filter
      </Button>
    </Aux>
  );
}
export default EnhancedTable;
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import EmployeePage from './containers/EmployeePage';
import CreatePage from './containers/CreatePage';
import EditPage from './containers/EditPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            exact={true}
            render={
              () => {
                return (
                  <EmployeePage />
                )
              }
            }
          />
          <Route
            path='/create'
            exact={true}
            render={
              () => {
                return (
                  <CreatePage />
                )
              }
            }
          />
          <Route
            path='/edit'
            exact={true}
            render={
              () => {
                return (
                  <EditPage />
                )
              }
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;

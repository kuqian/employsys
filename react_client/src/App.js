import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import EmployeePage from './containers/EmployeePage';
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
              ()=>{
                return (
                  <EmployeePage/>
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

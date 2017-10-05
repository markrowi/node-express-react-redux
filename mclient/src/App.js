import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './js/pages/Login';

class App extends Component {
   constructor() {
    super()
    this.state = {
      users: "Loading"
    };
  }

  render() {
    let users = this.state.users;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          
        </p>
        <div className="col-xs-12 col-sm-5">
        </div>
        <div className="col-xs-12 col-sm-2">
            <div className="panel panel-default login-panel">
                <div className="panel-heading">
                    Login
                </div>
                <div className="panel-body">
                  <Login/>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

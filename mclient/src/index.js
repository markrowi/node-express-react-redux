import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from 'react-router-redux'


import createHistory from 'history/createBrowserHistory'

import './index.css';
import Login from './js/pages/Login';
import Home from './js/pages/Home';
import Layout from './js/Layout';
import SVGPage from './js/pages/Svg'
import Contact from './js/pages/Contact'
import configureStore from "./js/store"

import registerServiceWorker from './registerServiceWorker';

var app = document.getElementById('root') ;
const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout >
                <Route exact path="/" name="home" component={Home}></Route> 
                <Route path="/login" component={Login}></Route>
                <Route  path="/contact" name="contact" component={Contact}></Route> 
                <Route  path="/svg" name="svg" component={SVGPage}></Route> 
            </Layout>
        </ConnectedRouter>
    </Provider>, app);
registerServiceWorker();







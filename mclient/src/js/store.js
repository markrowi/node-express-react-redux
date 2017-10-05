import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from 'react-router-redux';

import logger from "redux-logger";
import thunk  from "redux-thunk";
import promise from "redux-promise-middleware";

import reducers from "./reducers";




const configureStore = (browserHistory) => {

  let middleware = [
    thunk, // lets us dispatch() functions
    promise(),
    routerMiddleware(browserHistory), // <-- here I put createHistory() response/value
    logger,
  ]

    return createStore(
        reducers,
        applyMiddleware(
        ...middleware
        ))
}

export default configureStore


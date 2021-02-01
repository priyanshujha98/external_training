import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// importing bootstrap
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import reducer from './sagaapp/reducers/reducers';
import rootSaga from './sagaapp/sagas/sagaindex';

import { Provider } from "react-redux";

import MainSagaComponent from './sagaapp/mainsagacomponent';

import reportWebVitals from './reportWebVitals';

// create a SagaMiddlewareb instance

const appSagaMiddlewareInstance = createSagaMiddleware();

// create a parameter enhancer object that will be used to configure the REDUX DEVTOOLS for the store (optional) 

const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create a store object and configure reducer and SAGA middleware to it
// let store = createStore(reducer, middleware, devtools); <-- depticated
// react 16.8+ and the redux 4.0+
let store = createStore(reducer, parameterEnhancer(applyMiddleware(appSagaMiddlewareInstance)));

// keep the middleware running so that all actions will be monitored
appSagaMiddlewareInstance.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <MainSagaComponent></MainSagaComponent>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import Calculator from './calculatorcomponent/CalculatorComponent'
//import Employee from './day12/Tablegrid'
//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import ValidationComponent from './day13/validationComponent'
import MainRoute from './MERN application With Everytinh combined/mainRoutes'
import {BrowserRouter} from 'react-router-dom'
import reducer from './MERN application With Everytinh combined/reducer'
import rootSaga from './MERN application With Everytinh combined/sagaCheck'
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
const appSagaMiddlewareInstance = createSagaMiddleware();
const parameterEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer, parameterEnhancer(applyMiddleware(appSagaMiddlewareInstance)));


appSagaMiddlewareInstance.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <MainRoute/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

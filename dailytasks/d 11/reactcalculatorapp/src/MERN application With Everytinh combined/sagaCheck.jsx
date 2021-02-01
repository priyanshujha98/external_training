import {takeLatest,call,put,all} from 'redux-saga/effects'
import {HttpCalls} from './databasecalls'

function checkAuth(action){
    let serv = new HttpCalls()
    const response = serv.verification(action).then((result)=>result.data)
    return Promise.resolve(response);
}

function* dispatchTocheckAuth(action){
    let resp = yield call (checkAuth,action.payload)
    console.log('In saga',resp)
    yield put({
        type:'verifyResult',
        payload:resp
    })
}

function* listenTodispatchTocheckAuth(){
    console.log("Inside yield")
    yield takeLatest('verifyAuth',dispatchTocheckAuth)
}

function* dispatchToLogout(action){
    yield put({
        type:'LOGOUT_SUCESS',
        payload:null
    })
}

function* listenTodispatchToLogout(){

    yield takeLatest('LOGOUT',dispatchToLogout)
}

export default function* rootSaga(){
    console.log('Inside Saga listning')
    yield all([listenTodispatchTocheckAuth(), listenTodispatchToLogout()])
}
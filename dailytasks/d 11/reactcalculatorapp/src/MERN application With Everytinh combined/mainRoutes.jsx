import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from './homePage'
import LoginPortal from './login'
import UpdateDeleteEmployee from './updateDeleteEmployee' 
import CreateEmployee  from './createEmployee'
import Logout from './logout'
function MainRoute(){
    return(
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <Route exact path='/login' component={LoginPortal}></Route>
                <Route exact path='/registration' component={CreateEmployee}></Route>
                <Route exact path='/updateEmp/:id' component={UpdateDeleteEmployee}></Route>
                <Route exact path='/logout' component={Logout}></Route>
            </Switch>
        </div>

    )
}

export default MainRoute
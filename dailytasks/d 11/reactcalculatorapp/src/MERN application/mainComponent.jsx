import React, { Component } from 'react'
import {Link,Route,Switch,Redirect } from 'react-router-dom'
import ListEmployee from './listemployee'
import CreateEmployee from './createEmployee'
import ViewDepartment from './viewDepartment'
import UpdateDeleteEmployee from './updateDeleteEmployee'
class MainComponent extends Component{
    constructor(props){
        super(props)
        this.state = { }
        
    }
    render(){
        
        return(
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                   
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className="navbar-nav" >
                        <Link  className="nav-link" to='/'>
                            <li className="nav-item active">
                                Home
                            </li>
                            </Link>
                        <Link  className="nav-link" to="/createEmp">
                            <li className="nav-item" >
                                Create Employee
                            </li>
                        </Link>
                        <Link className="nav-link" to="/viewdept">
                            <li className="nav-item">
                                View Deaprtments
                            </li>
                        </Link>
                        </ul>
                        
                        
                    </div>
                </nav>
                <Switch>
                    <Route exact path='/' component={ListEmployee}></Route>
                    <Route exact path='/createEmp' component={CreateEmployee}></Route>
                    <Route exact path='/viewdept' component={ViewDepartment}></Route>
                    <Route exact path='/edit/:id' component={UpdateDeleteEmployee}></Route>
                </Switch>
            </div>
        )
    }
}

export default MainComponent;
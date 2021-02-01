import React from 'react'
import CreateUpdateComponent from './createUpdateComponent'
import {useDispatch, useSelector} from 'react-redux'
import addEmployee from './logic.js'
import ListEmployeesComponent from './listEmployeesComponenty';

const MainComponent = ()=>{
    let dispatch = useDispatch()
    let employees = useSelector(state=>state.listEmployeesReducer);
    return(
        <div className='container'>
            <CreateUpdateComponent AddEmployeeAction={dispatch(addEmployee(employees))}></CreateUpdateComponent>
            <hr/>
            <ListEmployeesComponent employeeList={employees}></ListEmployeesComponent>
        </div>

    )
}

export default MainComponent
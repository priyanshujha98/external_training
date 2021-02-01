import React from 'react';
import { connect } from "react-redux";
import { getDepartments,saveDepartment, updateDepartment, deleteDepartment } from "./../actions/actions";
const ReadWriteComponent=(props)=>{
    return(
        <div className="container">
            <input type="button" value="Get Data" onClick={props.getDepts} className="btn btn-warning"/>
            <hr/>
            <input type="button" value="Save Data" onClick={()=> props.postDept({
                EmpNo:8, EmpName: 'Sandra', DeptNo: 101, EmpSalary:400000
            })} className="btn btn-success"/>
            <hr/>
            <input type="button" value="Update Data" onClick={()=> props.updateDept({
                EmpNo:8, EmpName: 'Ballerina', DeptNo: 101, EmpSalary:400000
            })} className="btn btn-warning"/>
            <hr/>
            <input type="button" value="Delete Data" onClick={()=> props.deleteDept(8)} className="btn btn-warning"/>
        </div>
    );
};

// define a mapDispatchToProps object that will map
// the action creator method to an event of the button using props

const mapDispatchToProps ={
    // prop : actual action creator
    getDepts: getDepartments, // action for GET_DEPARTMENTS
    postDept: saveDepartment, // action for ADD_DEPARTMENT
    updateDept: updateDepartment,
    deleteDept: deleteDepartment
};


// when the click event is raise, the getDepts will be executed, 
// this contains the 'getDepartments' action creator. This acrion creator will be executed
// the action creator returns 'GET_DEPARTMENTS' type. Thias will be listened by reducers and 
// middleware. The Middleware will start executing and will output the output action
// i.e. GET_DEPARTMENTS_SUCCESS and this will be monitored by reducer to update the store
export default connect(null, mapDispatchToProps)(ReadWriteComponent);

//export default ReadWriteComponent;
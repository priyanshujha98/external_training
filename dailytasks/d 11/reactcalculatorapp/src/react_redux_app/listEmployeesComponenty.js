import React from 'react';

const ListEmployeesComponent=(props)=>{
    if(props.employeeList === undefined || props.employeeList.length === 0){
        return (
            <div>
                <strong>No Employees to Show in List</strong>
            </div>
        );
    } else {
        return (
           <div className="container">
            <h2>List of Employees</h2>
            <table className="table table-bordered table-striped table-danger">
                <thead>
                    <tr>
                      <td>EmpNo</td>
                      <td>EmpName</td>
                    </tr>
                </thead>
                <tbody>
                  {
                    props.employeeList.map((emp,index)=>(
                        <tr key={index}>
                           <td>{emp.employee.EmpNo}</td>
                           <td>{emp.employee.EmpName}</td>
                        </tr>
                    ))
                  }
                </tbody>
            </table>
           </div>
        );
    } 
};

export default ListEmployeesComponent;

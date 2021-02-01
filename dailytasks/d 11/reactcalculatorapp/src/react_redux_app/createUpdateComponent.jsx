import React, { useState } from 'react';;


const CreateUpdateComponent = (props)=>{
    const [employee, updateEmpoyee] = useState({EmpNo:0,EmpName:'',DeptName:'', Designation:''});

    const save = ()=>{
        props.AddEmployee(employee)
    }
    const clear=()=>{
        updateEmpoyee({EmpNo:0,EmpName:'',DeptName:'', Designation: ''});
    };

    return(
        <div className="container">
            <div className="form-group">
                <label>EmpNo</label>
                <input type="text" className="form-control"
                value={employee.EmpNo}
                onChange={(evt)=> updateEmpoyee({...employee, EmpNo: parseInt(evt.target.value)})} />
            </div>
            <div className="form-group">
                <label>EmpName</label>
                <input type="text" className="form-control" 
                value={employee.EmpName}
                    onChange={(evt)=> updateEmpoyee({...employee, EmpName: evt.target.value})}/>
            </div>
            <div className="form-group">
                <input type="button" value="Clear" onClick={clear} className="btn btn-warning"/>
                <input type="button" value="Save" onClick={save} className="btn btn-success"/>
        </div>
        </div>
    )
}

export default CreateUpdateComponent;
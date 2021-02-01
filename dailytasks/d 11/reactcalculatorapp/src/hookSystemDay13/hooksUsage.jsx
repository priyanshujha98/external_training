import React,{useEffect,useState} from 'react'
import {HttpCalls} from "./../MERN application/databasecalls"
import TableCreation from './hooksTableGenerator'
import dataContext from './ContextDefine'
const DataGather=()=>{
    const [depts, addDept] = useState([])
    const [emps, addEmployee] = useState([])
    const [selectedDept, addSelectedDept] = useState([])
    const serv = new HttpCalls();

    useEffect( ()=>{
       
        if(selectedDept.length<=1 || selectedDept<0){
            serv.getAllEmployee().then((resp)=>{
                addEmployee(resp.data)
                
            }).catch((err)=>{
                console.log('Error Occure',String(err))
            })
        }
        else{
            
            serv.getEmployeeOnDept(selectedDept).then((resp)=>{
                addEmployee(resp.data)
                
            }).catch((err)=>{
                console.log('Error Occure',String(err))
            })
        }

    },[selectedDept]);

    useEffect(()=>{
        serv.getAllDept().then((resp)=>{
            addDept(resp.data)
            
        }).catch((err)=>{
            console.log('Error Occu',String(err))
        })
    },[])
    if(emps.length>=1){
        return(
            <div className='container'>
                {/* Insert Call back when you want to modify it */}
                <br/><br/>
                <button className='btn btn-outline-danger' onClick={()=>{addSelectedDept([])}}>Back to normal</button><br/><br/>
                
                <dataContext.Provider value={{depts,addSelectedDept}}>
                    <TableCreation></TableCreation>

                </dataContext.Provider>
                <dataContext.Provider value={{emps,addEmployee}}>
                    <TableCreation ></TableCreation><br></br>

                </dataContext.Provider>

                
            </div>
            
        )
    }
    else{

        return(
           <div>
                <img src={require("./805.gif").default} style={{position:"relative",left:"50%",marginTop:'100px'}} alt='loading'/>
           </div>
        )
    }
}

export default DataGather
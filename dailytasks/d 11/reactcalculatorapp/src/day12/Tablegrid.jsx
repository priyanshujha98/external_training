import React,{Component} from  "react"
import { Departments,Designations } from "./department";
import { Logic } from "./logic";
import FormGenerator from "./formgenerator"
import TabelGeneration from "./tablegeneration"
class Employee extends Component{
    constructor(props){
        super(props)

        this.state= {};
        this.state.EmpData={
            EmpNo:'10',
            EmpName:'',
            department: Departments,
            designation : Designations,
            Salary:'',    
        }

        this.state.Deptselected=''
        this.state.DesignationsSelected=''
        this.logicOperations = new Logic()
        this.state.employees =  this.logicOperations.getEmployees();
        this.state.deleteButton =true
        this.state.Sorted=''
    }
   

    handler=(evt)=>{
        if(evt.target.name!='department' && evt.target.name!='designation'){
            //this.state.EmpData[evt.target.name] = evt.target.value
            this.setState({EmpData:{ ...this.state.EmpData, [evt.target.name]: evt.target.value} })
            
        }else{
            
            if (evt.target.value.length <1){
                if (evt.target.name=='department'){
                        
                        this.setState({[evt.target.name]:Departments})
                }else{
                    this.setState({[evt.target.name]:Designations})
                }
            }
            else{
                
                this.setState({[evt.target.name]:evt.target.value})
            }
        }
    }
    tableClickHandler=(evt)=>{
        Object.keys(evt).forEach((v,i)=>{
            this.setState({[v]:evt[v]})
        })
    }

    clear=()=>{
        Object.keys(this.state).forEach((v,i)=>{
            if(v!='department' && v!='designation'){

                this.setState({[v]:''})
            }
            else{
                if(v=='department'){
                    this.setState({[v]:Departments})
                }
                else{
                    this.setState({[v]:Designations})
                }
            }
        })
    }
    
    saveData=()=>{
        let emp={}
        Object.keys(this.state.EmpData).forEach((v,i)=>{
            if(typeof(this.state.EmpData[v])!=='object'){
                
                emp[v] = this.state.EmpData[v]
            }else{
                if(v=='department'){
                    emp.department=this.state.Deptselected
                }
                else{
                    emp.designation = this.state.DesignationsSelected

                }
            }
        })
        
        console.log(emp)
        var emps = this.logicOperations.addEmployee(emp)
        this.setState({employees: emps},()=>{});
    }

    deleteHandler=(evt)=>{
        delete evt['employees']
        var done = this.logicOperations.deleteEmployee(evt)
        
    }

    sortData=(evt)=>{
       // console.log(evt.target.innerHTML)
        var sorted = this.logicOperations.sortData(evt.target.innerHTML)
        this.setState({['Sorted']:evt.target.innerHTML})
    }
    selectValue=(evt)=>{
        //this.setState({[evt.target.name]:evt.target.value})
        
        
        if (evt.target.name=='department'){
            this.setState({Deptselected:evt.target.value},()=>{
                
            })
            
        }
        else if (evt.target.name=='designation'){
            this.setState({DesignationsSelected:evt.target.value},()=>{
               
            })
        } 

    }
    
    render(){
        return(
           
          
            <div>
                {console.log({'department':this.state.Deptselected,['designation']:this.state.DesignationsSelected})}
                <FormGenerator 
                builder={this.state.EmpData}
                changeDetected={this.selectValue.bind(this)}
                handlechange = {this.handler.bind(this)}
                changeDept={{'department':this.state.Deptselected,'designation':this.state.DesignationsSelected}}
                
                />
                 &nbsp;
                <div className='container'>


                    <button className='btn btn-warning' onClick={this.clear.bind(this)}>Clear</button>&nbsp;
                    <button className='btn btn-success' onClick={this.saveData.bind(this)}>Save</button>&nbsp;
                </div><br/>
                <TabelGeneration builder={this.state.EmpData}
                emplist={this.logicOperations.getEmployees()}/>
                
            </div>
        )
    }
    
}


export default Employee;
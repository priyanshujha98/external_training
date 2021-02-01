import React,{Component} from 'react'
import DropDown from './dropDown'
import {HttpCalls} from './databasecalls'
import { confirmAlert } from 'react-confirm-alert'

class UpdateDeleteEmployee extends Component{
    constructor(props){
        super(props)
        this.state={}
        this.state={
            EmpNo:'',
            EmpName:'',
            DeptNo:'',
            EmpSalary:''
        }
        
        this.state.savebtn=false
        this.state.dept=''
        this.httpservice = new HttpCalls()
    }
    componentDidMount(){
        
        this.httpservice.getAllDept().then((resp)=>{
            let temp =[]
            resp.data.forEach((v,i)=>{
                temp.push(v.DeptNo)
            })
            this.setState({dept:temp})
        }).catch((err)=>{
            alert(String(err))
        })

        let id = parseInt(this.props.match.params.id)
        this.setState({EmpNo:id})
        this.httpservice.getOneEmployee(id).then((resp)=>{
            
            Object.keys(resp.data).forEach((v,i)=>{
                this.setState({[v]:resp.data[v]})
            })
        }).catch((err)=>{
            alert("Error from Comp mount"+String(err))
        })
    }
    componentWillUnmount(){
        this.setState({dept:''})
    }

    handelChange=(evt)=>{
        
        this.setState({DeptNo:evt.target.value})
       
    }

    saveData = (evt)=>{
        let emp = {
            EmpNo:this.state.EmpNo,
            EmpName:this.state.EmpName,
            DeptNo:this.state.DeptNo,
            EmpSalary:this.state.EmpSalary

        }
        this.httpservice.updateData(emp).then((resp)=>{
            this.props.history.push('/');
        }).catch((err)=>{
            alert(String(err))
        })
    }

    deleteData = (evt)=>{
        let confirm = window.confirm('Are you sure ?')
        if(confirm){

            let id = this.state.EmpNo
            this.httpservice.deleteData(id).then((resp)=>{
                this.props.history.push('/')
            }).catch((err)=>{
                alert(String(err))
            })
        }
    }
    
    render(){
        return (
            <div className="container">
                
                <div className='form-group'>
                    <label htmlFor="EmpNo">EmpNo</label>
                    <input type="text" name='EmpNo' value={this.state.EmpNo} disabled className="form-control" required/>
                    
                </div>
                <div className='form-group'>
                    <label htmlFor="EmpNo">EmpName</label>
                    <input type="text" name='EmpName' value={this.state.EmpName} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>

                </div>
                <div className='form-group'>
                    <label htmlFor="EmpNo">DeptNo</label>
                    <DropDown handler={this.handelChange.bind(this)} arr={this.state.dept} selectedValue={this.state.DeptNo}></DropDown>

                </div>
                <div className='form-group'>
                    <label htmlFor="EmpNo">EmpSalary</label>
                    <input type="number" name='EmpSalary' value={this.state.EmpSalary} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>

                </div>
                <div className='form-group'>
                    <button className="btn btn-outline-danger btn-light" onClick={this.deleteData.bind(this)}>Delete</button>&nbsp;
                    <button className="btn btn-success" disabled={this.state.savebtn} onClick={this.saveData.bind(this)}>Update</button>
                </div>
                
   
            </div>
        )
    }
}


export default UpdateDeleteEmployee
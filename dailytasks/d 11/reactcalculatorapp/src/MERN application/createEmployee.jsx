import React,{Component} from 'react'
import DropDown from './dropDown'
import {HttpCalls} from './databasecalls'
class CreateEmployee extends Component{
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
        this.state.EmpNoError=''
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
    }
    componentWillUnmount(){
        this.setState({dept:''})
    }

    handelChange=(evt)=>{
        
        this.setState({DeptNo:evt.target.value})
       
    }

    checkEmpNo=(evt)=>{
        this.setState({EmpNo:evt.target.value})
        if(evt.target.value!==''){

            this.httpservice.getOneEmployee(evt.target.value).then((v,i)=>{
                if(v.data==''){
                    this.setState({savebtn:false})
                    this.setState({EmpNoError:''})
                }else{
                    
                    throw new Error('Row already Exists')
                }
            }).catch((err)=>{
                
                this.setState({savebtn:true})
                this.setState({EmpNoError:String(err)})
            })
        }
        else if(evt.target.value==''){
            this.setState({savebtn:false})
            this.setState({EmpNoError:''})
        }
    }

    saveData = (evt)=>{
        let emp = {
            EmpNo:this.state.EmpNo,
            EmpName:this.state.EmpName,
            DeptNo:this.state.DeptNo,
            EmpSalary:this.state.EmpSalary

        }
        this.httpservice.postData(emp).then((resp)=>{
            this.props.history.push('/');
        }).catch((err)=>{
            alert(String(err))
        })
    }

    render(){
        return (
            <div className="container">
                
                <div className='form-group'>
                    <label htmlFor="EmpNo">EmpNo</label>
                    <input type="text" name='EmpNo' value={this.state.EmpNo} onChange={this.checkEmpNo.bind(this)} className="form-control" required/>
                    <div className="alert alert-danger" hidden={!this.state.EmpNoError}>{this.state.EmpNoError}</div>
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
                    <button className="btn btn-outline-warning btn-light">Clear</button>&nbsp;
                    <button className="btn btn-success" disabled={this.state.savebtn} onClick={this.saveData.bind(this)}>Save</button>
                </div>
                
   
            </div>
        )
    }
}


export default CreateEmployee
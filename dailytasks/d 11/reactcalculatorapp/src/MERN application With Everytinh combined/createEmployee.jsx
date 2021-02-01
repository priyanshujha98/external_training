import React,{Component} from 'react'
import DropDown from './dropDown'
import {HttpCalls} from './databasecalls'
import{Link} from 'react-router-dom'

class CreateEmployee extends Component{
    constructor(props){
        super(props)
        this.state={}
        this.state={
            EmpNo:'',
            EmpName:'',
            DeptNo:'',
            EmpSalary:'',
            email:'',
            pass:''
        }
        
        this.state.savebtn=false
        this.state.EmpNoEmail=false
        this.state.EmpNoError=''
        this.state.dept=''
        this.httpservice = new HttpCalls()
        this.state.hide = false
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

    checkEmail=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value})
        if (evt.target.value!==''){
            this.httpservice.getOneEmail(evt.target.value).then((v,i)=>{
                if(v.data){
                    this.setState({savebtn:false})
                    this.setState({EmpNoEmail:''})
                }else{
                    
                    throw new Error('Row already Exists')
                }
            }).catch((err)=>{
                
                this.setState({savebtn:true})
                this.setState({EmpNoEmail:String(err)})
            })
        }
    }

    saveData = (evt)=>{
        let emp = {
            EmpNo:this.state.EmpNo,
            EmpName:this.state.EmpName,
            DeptNo:this.state.DeptNo,
            EmpSalary:this.state.EmpSalary,
            email:this.state.email,
            pass: this.state.pass

        }
        this.httpservice.postData(emp).then((resp)=>{
            this.props.history.push('/');
        }).catch((err)=>{
            alert(String(err))
        })
    }
    clear = ()=>{
        this.setState({EmpNo:"",EmpName:'',EmpSalary:''})
    }
    render(){
        return (
            <div className='loginPortal'>

                <div className="container">
                <div style={{textAlign:'center',fontSize:'15px',fontWeight:'bold'}}> Create Data</div>
                    <div className='body-content'>

                        <div className='form' hidden={this.state.hide}>
                            <label htmlFor="EmpNo" className='form-control'>EmpNo</label>
                            <input type="text" name='EmpNo' value={this.state.EmpNo} onChange={this.checkEmpNo.bind(this)} className="form-control" required/>
                            <div className="alertDanger" hidden={!this.state.EmpNoError}>{this.state.EmpNoError}</div>
                        
                            <label htmlFor="EmpNo" className='form-control'>EmpName</label>
                            <input type="text" name='EmpName' value={this.state.EmpName} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>

                        
                            <label htmlFor="EmpNo" className='form-control'>DeptNo</label>
                            <DropDown handler={this.handelChange.bind(this)} arr={this.state.dept} selectedValue={this.state.DeptNo}></DropDown>

                    
                            <label htmlFor="EmpNo" className='form-control'>EmpSalary</label>
                            <input type="number" name='EmpSalary' value={this.state.EmpSalary} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>

                            <Link to='/'>Back to home?</Link>
                        
                            
                        </div>
                        <div className='form' hidden={!this.state.hide}>
                            <label htmlFor="Email" className='form-control'>Email</label>
                            <input type="email" name='email' value={this.state.email} onChange={this.checkEmail.bind(this)} className="form-control" required/>
                            <div className="alertDanger" hidden={this.state.EmpNoEmail}>{this.state.EmpNoEmail}</div>
                            <label htmlFor="Password" className='form-control'>Password</label>
                            <input type="password" name='pass' value={this.state.pass} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>

                        </div>
                    </div>
                    <div className='footer'>
                            <button className="btnWarning" onClick={this.clear.bind(this)}>Clear</button>&nbsp;
                            <button className="btnSucess" hidden={this.state.hide} onClick={()=>this.setState({hide:!this.state.hide})}>Next</button>
                            <button className="btnSucess" hidden={!this.state.hide} onClick={()=>this.setState({hide:!this.state.hide})}>Back</button>
                            <button className="btnSucess" hidden={!this.state.hide || this.state.savebtn} onClick={this.saveData.bind(this)}>Save</button>
                    </div>
                    
    
                </div>
            </div>
        )
    }
}


export default CreateEmployee
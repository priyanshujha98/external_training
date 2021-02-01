import React,{Component} from 'react'
import DropDown from './dropDown'
import {HttpCalls} from './databasecalls'
import './../style3.css'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
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
        this.state.cmpMounted = false
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
            this.setState({cmpMounted:true})
        }).catch((err)=>{
            alert("Error from Comp mount"+String(err))
        })

       
    }
    componentWillUnmount(){
        this.setState({dept:''})
        this.setState({cmpMounted:false})
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
        if(this.props.details!==undefined){

            return (
                <div className='loginPortal'>
    
                    <div className="container">
                        <div style={{textAlign:'center',fontSize:'15px',fontWeight:'bold'}}> Update Data</div>
    
                        <div className="body-content">
    
                            <div className="form">
                                <label htmlFor="EmpNo" className='form-control'>EmpNo</label>
                                <input type="text" name='EmpNo' value={this.state.EmpNo} disabled className='form-control' required/>
                                
                            
                                <label htmlFor="EmpNo" className='form-control'>EmpName</label>
                                <input type="text" name='EmpName' value={this.state.EmpName} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className='form-control' required/>
    
                            
                                <label htmlFor="EmpNo" className='form-control'>DeptNo</label>
                                <DropDown  handler={this.handelChange.bind(this)} arr={this.state.dept} selectedValue={this.state.DeptNo}></DropDown>
                                
                                <label htmlFor="EmpNo" className='form-control'>EmpSalary</label>
                                <input type="number" name='EmpSalary' value={this.state.EmpSalary} onChange={(evt)=>{this.setState({[evt.target.name]:evt.target.value})}} className="form-control" required/>
    
                                <Link to='/'>Back to home?</Link>
                            </div>
                        </div>
                        <div className='footer'>
                            
                            <button className="btnDanger" onClick={this.deleteData.bind(this)}>Delete</button>&nbsp;
                            <button className="btnSucess" disabled={this.state.savebtn} onClick={this.saveData.bind(this)}>Update</button>
                            
                        </div>
                </div>
                    
    
                </div>
            )
        }else{
            if(this.state.cmpMounted){

                return(
    
                    <Redirect to='/login'></Redirect>
                )
            }
            else{
                return(

                    <div>Hold On buddy</div>
                )
            }
        }
    }
        
}

const mapStatetoProps = (state)=>({
    details:state.details
})

export default connect(mapStatetoProps,null)(UpdateDeleteEmployee)
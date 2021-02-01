import React, {Component} from 'react'
import {HttpCalls} from './databasecalls'
import TableCreation from './tableCreation'
class ViewDepartment extends Component{
    constructor(props){
        super(props)

        this.reply = new HttpCalls()
        this.state={}
        this.state.getalldept = ''
    }

    componentDidMount(){
        
        this.reply.getAllDept().then((res)=>{
           
            this.setState({ getalldept:{status:200,data:res.data}} )
        }).catch((err)=>{
           
           this.setState({ getalldept:{status:400,data:String(err)}} )
        })
    }

    render(){
       
        if(this.state.getalldept!=''){
            return(
                
                <div className='container'>
                    
                    {   
                        <TableCreation builder={this.state.getalldept} hide={true}></TableCreation>
    
                    }   
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

}
export default ViewDepartment
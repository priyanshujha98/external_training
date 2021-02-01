import React, {Component} from 'react'
import {HttpCalls} from './databasecalls'
import TableCreation from './tableCreation'
class ListEmployee extends Component{
    constructor(props){
        super(props)

        this.reply = new HttpCalls()
        this.state={}
        this.state.getallemployee = ''
        this.state.searchedString=''
        
       
    }
    
    componentDidMount(){
        
        this.reply.getAllEmployee().then((res)=>{
            
            this.setState({ getallemployee:{status:200,data:res.data}} )
        }).catch((err)=>{
           
           this.setState({ getallemployee:{status:400,data:String(err)}} )
        })
    }
    handel= (evt)=>{
        this.setState({searchedString:evt.target.value})
        if(evt.target.value==''){
            this.componentDidMount()
        }
    }
    getSearchedData=(evt)=>{
        this.reply.searcData(this.state.searchedString).then((resp)=>{
            this.setState({ getallemployee:{status:200,data:resp.data}} )
        }).catch((err)=>{
            this.setState({ getallemployee:{status:400,data:String(err)}} )
        })
    }

    render(){
        const style={
            width:"250px",
            position:'relative',
            display:"inline",
            margin:'10px'
        }
       
        if(this.state.getallemployee!=''){
            return(
                
                <div className='container'>
                    <div className="form-group">
                        
                            <input style={style} className="form-control" value={this.state.searchedString} onChange={this.handel.bind(this)} type="search" placeholder="Search" aria-label="Search" required/>
                            <button className="btn btn-outline-success" onClick={this.getSearchedData.bind(this)}>Search</button>
                        
                    </div>
                    {   
                        <TableCreation builder={this.state.getallemployee} hide={false}></TableCreation>
    
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
export default ListEmployee 
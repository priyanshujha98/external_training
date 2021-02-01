import React,{Component} from 'react'
import {HttpCalls} from './databasecalls'

class DropDown extends Component{
    constructor(props){
        super(props)

        this.httpservice = new HttpCalls()
        this.state={}
       
    }

    

    render(){
        if(this.props.arr!==''){

            return(
                <select onChange={this.props.handler.bind(this)} required value={this.props.selectedValue} className='form-control'>
                    <option value="" className='form-control'>--Select--</option>
                    {this.props.arr.map((v,i)=>(
                        <option value={v} className='form-control' key={i}>{v}</option>
                    ))}
                </select>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default DropDown
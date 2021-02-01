import React,{Component} from 'react'
import {Link } from 'react-router-dom'
class TableCreation extends Component{
    constructor(props){
        super(props)

        
    }

    render(){
        var data=this.props.builder
        
        if(data.status===200){

            return(
                <table className="table table-dark table-hover">
                        <thead >
                            <tr>
                                {
                                    Object.keys(data.data[0]).map((v,i)=>(
                                        <th key={i}>
                                            {v}
                                        </th>
                                        
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                data.data.map((v,i)=>(
                                   <tr key={i} >
                                        {Object.keys(v).map((v2,i2)=>(    
                                            <td key={i2} >
                                                {v[v2]}
                                            </td>
                                        ))}
                                        <td hidden={this.props.hide}>
                                            <Link to={`/edit/${v.EmpNo}`}><button className='btn btn-light'>Edit/Delete</button></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
            )
        }else if(data.status==400){
            alert(`Error Occured ${data.data}`)
        }
    }
}

export default TableCreation
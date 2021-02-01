import React, { Component } from "react"

class TabelGeneration extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='container'>
                <table className="table table-dark table-hover ">
                    <thead>
                        <tr>
                            {
                                Object.keys(this.props.builder).map((v,i)=>(
                                    
                                    <th key={i}>{v}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        
                            {
                                this.props.emplist.map((v,i)=>(
                                    <tr key={i}>
                                    {
                                        

                                            Object.keys(v).map((v2,i2)=>(
                                                <td key={i2}>
                                                    {v[v2]}
                                                </td>
                                            ))
                                        
                                    }

                                </tr>
                                ))
                            }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TabelGeneration;
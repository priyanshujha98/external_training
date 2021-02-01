import React,{useContext} from 'react'
import dataContext from './ContextDefine'
const  TableCreation=()=>{
    let data = useContext(dataContext)
    let type;
    let data2;
    
    try{
        data2 = data.emps
        type=false
        if(!data2){
            throw new Error('data not found')
        }
    }
    catch{
        data2 = data.depts
        type=true
    }
    
    
   
    
    if (data2.length>=1){

        return(
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        {Object.keys(data2[0]).map((v,i)=>(
                            <td key={i}>
                                {v}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data2.map((v,i)=>(
                            <tr key={i}>
                                {
                                    Object.keys(v).map((v2,i2)=>(
                                        <td key={i2} onClick={()=>{if(type){data.addSelectedDept(v.DeptNo)}}}>
                                            {v[v2]}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
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

export default TableCreation
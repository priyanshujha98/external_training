import React,{Component} from "react"

class FormGenerator extends Component{

    constructor(props){
        super(props)

    }
    changeDetected=(evt)=>{
       
        this.props.changeDetected(evt)
    }

    render(){
        var data = this.props.builder
        return(
            <div className='container'>

                {
                    Object.keys(data).map((v,i)=>{
                        if(typeof(data[v])!='object'){

                            return(
                                
                                <div className='form-group' key={i}>
    
                                    <label htmlFor={v} >{v}</label>
                                    <input type="text" className='form-control' name={v} value={data[v]} onChange={this.props.handlechange.bind(this)}/>
                                </div>
                            )
                        }
                        else{
                            return(

                            <div className='form-group' key={i}>

                                <label htmlFor={v}>{v}</label>
                                <Dropdown arr={data[v]} name={v} changeDept={this.props.changeDept} changed={this.changeDetected.bind(this)}></Dropdown>
                            </div>
                            )
                        }
                })
                }
            </div>
        )
    }
}

class Dropdown extends Component{
    constructor(props){
        super(props)
        
    }
    render() {
        {console.log(this.props.changeDept[this.props.name])}
        return (
             <select value={this.props.changeDept[this.props.name]} name={this.props.name} className='form-control' onChange={this.props.changed}>
                 {
                     this.props.arr.map((v,i)=>(
                         <option value={v} key={i} >{v}</option>
                     ))
                 }
             </select>
        );
    }
}

export default FormGenerator

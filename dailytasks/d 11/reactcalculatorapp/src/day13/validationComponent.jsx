import React, { Component } from 'react';
import {Logic} from './../day12/logic';
import  ValidationSummaryComponent from "./validationSummary";
class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            EmpNo:0,
            EmpName: '',
            isEmpNoValid:true,
            isEmpNoExists: false,
            isEmpNameValid:true,
            isFormValid:false,
            errorMessages:[]
         };
         this.logic = new Logic();
         
    }
    handleValueChange=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value});
        this.validateForm(evt.target.name, evt.target.value);
    }

    validateForm=(name,value)=>{
        
        if(name === "EmpNo"){
            if(parseInt(value) <= 0 || value.length >= 10){
                    this.setState({isEmpNoValid:false});
                    this.setState({isFormValid:false});
                  
                    if(!this.state.errorMessages.includes('EmpNo is mandaory, must be +, must be max 10 in length' )){

                        this.state.errorMessages.push('EmpNo is mandaory, must be +, must be max 10 in length' );
                    }
                    console.log(this.state.errorMessages);

            } else {
                this.setState({isEmpNoValid:true});
                this.setState({isFormValid:true});

                let temp = this.state.errorMessages.filter((v,i)=>{
                    return v !='EmpNo is mandaory, must be +, must be max 10 in length' 
                })
                this.setState({errorMessages:temp});
            }
        } 
         
        if(name === "EmpName"){
            if(value.length < 5 || value.length > 20){
                this.setState({isEmpNameValid:false});
                this.setState({isFormValid:false});
                if(!this.state.errorMessages.includes('EmpName is mandaory, must be min 5 characters, must be max 20 characters')){

                    this.state.errorMessages.push('EmpName is mandaory, must be min 5 characters, must be max 20 characters');
                }
                    
                    console.log(this.state.errorMessages);
            } else {
                this.setState({isEmpNameValid:true});
                this.setState({isFormValid:true});
                
                let temp = this.state.errorMessages.filter((v,i)=>{
                    return v !='EmpName is mandaory, must be min 5 characters, must be max 20 characters' 
                })
                this.setState({errorMessages:temp});
            }
            
        }
        
    }


    save=()=>{
        alert('Submitted');    
    }
    render() { 
        return (
            <div className="container">
              <form onSubmit={this.save.bind(this)}>
              <div className="form-group">
                  <label>EmpNo</label>
                  <input type="text" className="form-control"
                  name="EmpNo"  
                  value={this.state.EmpNo}
                   onChange={this.handleValueChange.bind(this)}/>
                   <div className="alert alert-danger" hidden={this.state.isEmpNoValid}>
                      EmpNo must be Positive Numeric
                   </div>
                   <div className="alert alert-danger" hidden={!this.state.isEmpNoExists}>
                   EmpNo  is alreay present in array
                </div>
                </div>
                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" className="form-control"
                    name="EmpName" 
                    value={this.state.EmpName}
                     onChange={this.handleValueChange.bind(this)}/>
                     <div className="alert alert-danger" hidden={this.state.isEmpNameValid}>
                     EmpName must be min 5 char upto max 20 characters
                  </div>
              </div>
                <div className="form-group">
                    
                    <input type="submit" value="submit" disabled={!this.state.isFormValid}  className="btn btn-success"/>
                </div>
                 
              </form>
              <ValidationSummaryComponent messages={this.state.errorMessages}></ValidationSummaryComponent>
            </div>
        );
    }
}
 
export default ValidationComponent;

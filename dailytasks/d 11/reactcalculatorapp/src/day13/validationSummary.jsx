import React, { Component } from 'react';
class ValidationSummaryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if( this.props.messages === undefined || this.props.messages.length == 0) {
            return (<div>All Valid</div>)
        } else {
        return ( 
            <div>
              {
                  this.props.messages.map((m,idx)=>(
                     <strong key={idx}>{m} <br/></strong>
                  ))
              }
            </div>
        );}
    }
}
 
export default ValidationSummaryComponent;
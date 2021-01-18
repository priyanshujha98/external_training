import React,{Component} from 'react'

class Output extends Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div id='output'>
                {this.props.eval}
            </div>
        )
    }
}

class Calculator extends Component{
    constructor(props){
        super(props)

        this.state = {expression:''}
    }

    showValue(keys) {
        try{

            if(keys.target.value=='AC'){
                this.setState({expression:''})
            }
            else if (keys.target.value=='+/-'){
                if (this.state.expression[0] != '-'){
    
                    this.setState({expression:'-'+this.state.expression})
                }
                else{
                    this.setState({expression:this.state.expression.replace('-','')})
                }
            }
            else if(keys.target.value=='%'){
                this.setState({expression:this.state.expression/100})
            }
            else if(keys.target.value=='='){
                this.setState({expression:eval(this.state.expression)})
            }
            else{
                this.setState({expression:this.state.expression + keys.target.value})
            }
            
        }
        catch(err){
            this.setState({expression:'Error : Weird Input'})
        }
    }

    render(){
        var experssion = ['AC','+/-','%','/','<br>','7','8','9','*','<br>','4','5','6','-','<br>','1','2','3','+','<br>','0','.','=']

        
       var temp = experssion.map((name,i)=>{
           if (name!=='<br>'){

               return <button key={i} onClick={this.showValue.bind(this)} value={name}>{name}</button>
           }
           else{
               return  <br key={i} />
           }
       })
        return(
            <div>
            <Output eval={this.state.expression}></Output>
            <br/>
                <div id='input'>
                    {temp}
                </div>  
            </div>
            
        )
    }
}

export default Calculator;
import React,{useState,useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import './../style2.css'
import { invokeAuth } from './action'
import { connect} from 'react-redux'
function LoginPortal(props){
   
    const [username,checkUsername] = useState(null)
    const [pass,checkPassword] = useState(null)
    

    useEffect(()=>{
        const activeUser = JSON.parse(localStorage.getItem('active'))
       console.log('In login', activeUser)
        if (activeUser !== undefined && activeUser!==null && activeUser!==''){
            props.iv(activeUser)
           
        }
        console.log('Ho ja Delete',props.details)
    },[])
    
    const check = ()=>{
        
        props.iv({email:username,pass:pass})
        console.log('x value',props.details)
    }
    
    if(props.details===undefined || props.details === null ){
        
        return(
            <div className='loginPortal'>
    
                <div className="container">
                    
                    <div className="form">
                    
                        <div className="login">
                        <br/><br/>
                        <div className="body-content">
                            <input className="usr" type="email" onChange={(evt)=>{checkUsername(evt.target.value)}} placeholder="Username" spellCheck="false"/><br/>
                            <input className="psw" type="password"  onChange={(evt)=>{checkPassword(evt.target.value)}} placeholder="Password"/>
                        </div>
                        
                        <div className="footer">
                            <button className="btn" type="button" onClick={check}>- Login -</button>
                            
                        </div>
                        </div>
                        <Link to='/'><div className="box1">Back to Home ?</div></Link>
                        <div className="box2"></div>
                        <Link to='/registration'><div className="box3">New Here ?</div></Link>
                        
                    </div>
                    
                </div>
                
            </div>
        )
    }
    else{
        if(props.details.verified){
            console.log('Active',JSON.stringify(props.details))
            localStorage.setItem('active',JSON.stringify(props.details))
            return(
                
               <Redirect to={`/updateEmp/${props.details.EmpNo}`}> </Redirect>
            )

        }else{
            return(
                <div className='loginPortal'>
        
                    <div className="container">
                        
                        <div className="form">
                        
                            <div className="login">
                            <br/><br/>
                            <div className="body-content">
                                <input className="usr" type="email" onChange={(evt)=>{checkUsername(evt.target.value)}} placeholder="Username" spellCheck="false"/><br/>
                                <input className="psw" type="password"  onChange={(evt)=>{checkPassword(evt.target.value)}} placeholder="Password"/>
                            </div>
                            
                            <div className="footer">
                                <button className="btn" type="button" onClick={check}>- Login -</button>
                                
                            </div>
                            </div>
                            <Link to='/'><div className="box1">Back to Home ?</div></Link>
                            
                            <div className="box2Failed" >Verification Failed ! <br/> Try Again</div>
                            <Link to='/registration'><div className="box3">New Here ?</div></Link>
                            
                        </div>
                        
                    </div>
                    
                </div>
            )
        }
      
    }

   
}
const mapDispatchToProps={
    iv:invokeAuth
}

const mapStatetoProps=(state)=>({
    details:state.details
})


 //connect(null, mapStatetoProps)(LoginPortal)

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPortal)
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './../index.css';
import TableCreation from './tableCreation'
import {HttpCalls} from './databasecalls'
import { invokeAuth } from './action'
import { connect} from 'react-redux'
function HomePage(props){
    const [showState,changeState] = useState(true)
    const[getallemployee, setgetallemployee] = useState(null)
    const [activeSession, changeactiveSession] = useState(false)
    const reply = new HttpCalls()
    useEffect(()=>{
        const activeUser = JSON.parse(localStorage.getItem('active'))
       
        if (activeUser !== undefined && activeUser!==null && activeUser!==''){
            props.iv(activeUser)
            changeactiveSession(true)
        }
        reply.getAllEmployee().then((res)=>{
            
            setgetallemployee({status:200,data:res.data})
        }).catch((err)=>{
           
            setgetallemployee({status:400,data:String(err)})
        })
    },[])
  
    if(getallemployee!=='' && getallemployee!==null && getallemployee!==undefined){
        return(
        
            <div className="wrapper">
                <div className="Container" id='home'>
                        <div className="nav">
                            <div className="logo">
                                COOL LOGO
                            </div>
                            <div className="menu">
                                <ul className="navMenu">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/login' hidden={activeSession}>Login</Link></li> 
                                <li><Link to='/login' hidden={!activeSession}>Update</Link></li>
                                <li><Link to='/logout' hidden={!activeSession}>Logout</Link></li>
                                <li> <Link to='/registration'>Registration</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="header">
                            <h1 >BlazeClan's</h1>
                            <p>New Era of Management</p>
                        
                            <a href='#about'><button type="button" onClick={()=>{changeState(!showState)}}>View Details</button></a>
                            
                        </div>
                </div>
                <div className='Container' id='about'>
                    <div className='header'>
                        <h1 style={{color:'black'}} >About</h1>
                        <TableCreation builder={getallemployee} hide={false}></TableCreation>
                        
                    </div>
                        <a href='#home'><button type="button" onClick={()=>{changeState(!showState)}}>Back to Home</button></a>
                </div>
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

const mapDispatchToProps={
    iv:invokeAuth
}


export default connect(null, mapDispatchToProps) (HomePage)
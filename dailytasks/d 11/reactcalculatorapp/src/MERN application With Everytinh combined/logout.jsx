import React from 'react'
import {Redirect} from 'react-router-dom'
import { connect} from 'react-redux'
import { invokeLogout } from './action'
function Logout(props){
    localStorage.clear("active");
    props.iv({})
    return(
        <Redirect to='/'></Redirect>
    )
}

const mapDispatchToProps={
    iv:invokeLogout
}

export default connect(null, mapDispatchToProps) (Logout)
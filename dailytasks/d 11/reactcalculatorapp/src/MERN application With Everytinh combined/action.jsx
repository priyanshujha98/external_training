export const invokeAuth = (data)=>{
    
    return({
        type:'verifyAuth',
        payload:data
    })
}

export const invokeLogout = (data)=>{
    return({
        type:'LOGOUT',
        payload:data
    })
}
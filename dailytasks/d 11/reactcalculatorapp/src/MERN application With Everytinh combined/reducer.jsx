const reducer = (state=[],action)=>{
    switch(action.type){
        case 'verifyAuth':
           
            return {...state}
        case 'verifyResult':
           
            return {...state,details:action.payload}
        case 'LOGOUT':
            console.log('LG',action)
            return{...state}
        case "LOGOUT_SUCESS":
            console.log('Lg reducer',action)
            return {...state,details:action.payload}

        default:
            return state
    }
}

export default reducer
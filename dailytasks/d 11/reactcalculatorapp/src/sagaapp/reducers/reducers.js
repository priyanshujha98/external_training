// noted point: If only single reducer function is created for all 
// action dispatching  monitoring. Then its is not required 
// to make use of combineReducer() object
// Why: When we pass the sigle reducer function to createStore()
// the createStore() method internally match the singlereducer function
 

// to combineReducer() function and load it
const reducer = (state=[],action)=>{
    switch(action.type) {
        case 'GET_DEPARTMENTS':
            // return initial action
             return {...state};
        case 'GET_DEPARTMENTS_SUCCESS':
              // mutate the state from the received departments
              // from the response action 
              return {...state, departments:action.departments};     
        case 'ADD_DEPARTMENT':
            console.log('Listening to GET_DEPARTMENTS Action in reducers');
             return {...state};      
        case 'ADD_DEPARTMENT_SUCCESS':
            // mutate the state by adding new department in it
            console.log(`Receibed data in state in reducers = ${JSON.stringify(action.department)}`);
             return {...state, department: action.department};     
        case 'UPDATE_DEPARTMENT':
            return {...state};
        case "update_department_sucess":
            console.log('Update',action)
            return {...state, department: action.department}
        case 'delete_sucessfull':
            console.log('Update',action)
            return {...state, resp: action.resp}
        case 'DELETE_DEPARTMENT':
            return {...state}
        default:
             return state;
    }
};

export default reducer;
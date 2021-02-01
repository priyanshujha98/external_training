import {combineReducers} from 'redux'


export const addEmployeeReducer=(state, action)=>{
    switch (action.type) {
        case 'ADD_EMPLOYEE':
               return {
                   employee: action.employee
               };   
        default: 
              return state; // original state 
               
    }
};

export const listEmployeesReducer=(state=[], action)=>{
    switch(action.type) {
        case 'ADD_EMPLOYEE':
            return [...state, addEmployeeReducer(undefined, action)];
        default :
            return state;    
    }
};

const reducer = combineReducers({listEmployeesReducer});

export default reducer;


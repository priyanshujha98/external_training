import * as axios from 'axios'

export class HttpCalls{
    constructor(){
        this.url="http://localhost:5000/"
    }
    
    getAllDept(){
        let resp = axios.get(`${this.url}dept`)
        return resp
    }
    getAllEmployee(){
        let resp = axios.get(`${this.url}emp`)
        return resp
    }
    getOneEmployee(id){
        let resp = axios.get(`${this.url}emp/${id}`)
        return resp
    }

    postData(data){
        let resp = axios.post(`${this.url}emp`,data,{
            'Content-Type':'application/json'
        })
        return resp
    }

    searcData(data){
        data = {searchString:data}
        let resp = axios.post(`${this.url}search`,data,{
            'Content-Type':'application/json'
        })
        return resp
    }
    updateData(data){
        let resp = axios.put(`${this.url}emp/${data.EmpNo}`,data,{
            'Content-Type':'application/json'
        })
        return resp
    }
    
    deleteData(id){
        let resp = axios.delete(`${this.url}emp/${id}`)
        return resp
    }

    getEmployeeOnDept(id){
        let resp = axios.get(`${this.url}search/dept/${id}`)
        return resp
    }
}
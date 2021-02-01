export class Logic {
    constructor(){
        this.employees=[];
        this.employees.push(
            {EmpNo:101, EmpName: 'Akash', department: 'IT', designation: 'Manager', Salary:10000},
            {EmpNo:102, EmpName: 'Mukesh', department: 'HRD', designation: 'Lead', Salary:12000},
            {EmpNo:103, EmpName: 'Abhay', department: 'SALES', designation: 'Manager', Salary:30000},
            {EmpNo:104, EmpName: 'Nandu', department: 'TRAINING', designation: 'Trainer', Salary:17000}
        );
    }

    getEmployees(){
        
        return this.employees;
    }

    addEmployee(emp){
        let flag =true
        this.employees.forEach((v,i)=>{
            if(v.EmpNo == emp.EmpNo){
                Object.keys(v).forEach((v2,i2)=>{
                    v[v2]=emp[v2]
                })
                flag=false
            }
        })

        if(flag){

            this.employees.push(emp);
        }
        return this.employees;
    }

    deleteEmployee(emp){
        let index=0
        this.employees.forEach((v,i)=>{
            if(v.EmpNo == emp.EmpNo){
                index=i
            }
        })
        this.employees.splice(index,1)
        return this.employees
    }
    sortData(emp){
        let arr=[]
        this.employees.forEach((v,i)=>{
            
            arr.push(v[emp])
            
        })
        arr = arr.sort()
        console.log('arr',arr)
        var temp=[] 
        var index=[]
        arr.forEach((v,i)=>{

            this.employees.forEach((v2,i2)=>{
               
                if(v2[emp]==v){
                    if (!index.includes(i2)){

                        temp.push(v2)
                        index.push(i2)
                    }
                }
            })
        })
        this.employees=temp
        console.log(this.employees)
        return this.employees
    }
}

 
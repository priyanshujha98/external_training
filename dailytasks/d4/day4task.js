class Department{
    constructor(){

        this.DepartmentDetails = new Map();
        this.DepartmentDetails.set(1,{DeptName:"Dcc", DeptLocation:'Pune', DeptCapacity:50});
        this.DepartmentDetails.set(2,{DeptName:"DS", DeptLocation:'Pune', DeptCapacity:50});
        this.DepartmentDetails.set(3,{DeptName:"DAI", DeptLocation:'Pune', DeptCapacity:50});
     
    }

    capacity(key){
        
        if ((this.DepartmentDetails.get(key)['DeptCapacity'] - 1)>=1){
            this.DepartmentDetails.get(key)['DeptCapacity'] = this.DepartmentDetails.get(key)['DeptCapacity'] - 1
            return true
            
        }
        else{
            return false
        }
    
    }

}

class Employee extends Department{
    constructor(){
        
        super()
        this.EmpDetails = new Map()
    }

    AddEmployee(empno, empname, deptno, designation, salary){
        if(empno <0){
            console.log('Emp No should be +ve')
            return 
        }
        empname = empname[0].toUpperCase() + empname.slice(1,empname.length)
        if (salary <0){
            console.log('Salary should not be -ve')
            return
        }
        let x = this.capacity(deptno)
        if (x){
            this.EmpDetails.set(empno, {EmpName:empname,EmpDept: deptno, EmpDesignation : designation, EmpSalary : salary})
       
        }
        else {
            console.log('Not Enough Space')
        }
    }

    UpdateEmployee(key,data){
        
        this.EmpDetails.forEach((v,i)=>{
            if (i==key){
                
                Object.keys(data).forEach((v2,i2)=>{
                    
                    this.EmpDetails.get(i)[v2] = data[v2]
                })
            }
        })
        

    }

    deletedata(key){
        this.EmpDetails.delete(key)
    }

    showalldata(){
        console.log(this.EmpDetails)
    }

    getAllEmployees(condition,value){
        
        if (condition == 'DeptName' || condition == 'DeptLocation'){
            this.EmpDetails.forEach((v,i)=>{
                if (this.DepartmentDetails.get(v['EmpDept'])[condition]==value){
                    console.log(v)
                }
            })
        }
        else if (condition == 'EmpDesignation' || condition == 'EmpName'){
            this.EmpDetails.forEach((v,i)=>{
                if (v[condition]==value){
                    console.log(v)
                }
            })
        }
        else if (condition = 'DName_Ddesignation'){
            
            this.EmpDetails.forEach((v,i)=>{
                if (this.DepartmentDetails.get(v['EmpDept'])['DeptName']==value['dept'] && v['EmpName'] == value['Name']){
                    console.log(v)
                }
            })

        }
        
    }
}

e1 = new Employee()
e1.AddEmployee(1,'aaaa',1,'Manager',10000)
e1.AddEmployee(2,'cccc',1,'Sales',10000)
e1.deletedata(1)
e1.showalldata()
//e1.AddEmployee(3,'Test',2,'Sales',1000)
//e1.showalldata()
//e1.UpdateEmployee(1,{EmpName:'B',EmpDept:2}) /// {0:EmpName(v2), 1:EmpData(v2)}
//e1.showalldata()
//e1.getAllEmployees('DeptName','DS')
//e1.getAllEmployees('DeptLocation','Pune')
//e1.getAllEmployees('EmpDesignation','Sales')
//e1.getAllEmployees('EmpName','Sales')
//e1.getAllEmployees('DName_Ddesignation',{Name:'Cccc',dept:'Dcc'})
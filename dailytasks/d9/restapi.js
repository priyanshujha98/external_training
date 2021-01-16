let express  =require('express');

let bodyParser = require('body-parser');

let cors = require('cors');

let instance = express();

instance.use(bodyParser.urlencoded({extended:false}));

instance.use(bodyParser.json());
instance.use(cors({
    origin: "*", 
    methods: "*", 
    allowedHeaders: "*"
}));


let employees = [
    {EmpNo:101, EmpName: 'Mahesh', DeptName: 'IT'},
    {EmpNo:102, EmpName: 'Vikram', DeptName: 'HRD'},
    {EmpNo:103, EmpName: 'Supprot', DeptName: 'SALES'}
];

instance.get("/api/employees", (req,resp)=>{

    let authValues = req.headers.authorization;
    let credValues =  authValues.split(' ');
    console.log(credValues[0]    + '   ' + credValues[1]);
    console.log(credValues[1]);
    let data = credValues[1].split(':');
    if(data[0].trim() === "mahesh" && data[1].trim() === "mahesh"){
        resp.status(200).send(employees);
    }
    resp.status(401).send(`Sorry !!! Credentials are not matched`);

});

instance.get("/api/employees/:id",(req,resp)=>{
 let authValues = req.headers.authorization
    
 let valid = validate(authValues)
 if (valid){
    let id = req.params.id;    
    let emp = employees.filter((e,idx)=>{
        return e.EmpNo == parseInt(id);
    }); 
    if(emp.length == 0) {
        resp.status(404).send(`Requested EmpNo ${id} is not available`);
    } 
    resp.status(200).send(emp[0]);
 }
 else{
    resp.status(401).send('Wrong Authorisation')
 }
});

instance.post("/api/employees", (req,resp)=> {
    let authValues = req.headers.authorization
    
    let valid = validate(authValues)
 
    if (valid){
        let emp = {
            EmpNo:req.body.EmpNo,
            EmpName: req.body.EmpName, 
            DeptName: req.body.DeptName
        };
        console.log(JSON.stringify(emp));
        employees.push(emp);
        resp.status(200).send(employees);
    }
    else{
        resp.status(401).send('Wrong Authorisation')
    }
});


instance.put("/api/employees/:id", (req,resp)=> {

    let authValues = req.headers.authorization
    
    let valid = validate(authValues)
    if (valid){
        let id = req.params.id;

        let emp = {
            EmpNo:req.body.EmpNo,
            EmpName: req.body.EmpName, 
            DeptName: req.body.DeptName
        };

        if(parseInt(id) !== emp.EmpNo) {
            resp.status(402).send(`The id = ${id} from URL does not match with data from body EmpNo = ${emp.EmpNo}`);
        }
        let flag = false
        employees.forEach((v,i)=>{
            if(parseInt(id) == v.EmpNo){
                v.EmpName = emp.EmpName
                v.DeptName = emp.DeptName
                flag = true
            }
        })
        if (flag){
            resp.status(200).send(employees);
        }
        else{
            resp.status(204).send('Did not updated')
        }
    }
    else{
        resp.status(401).send('Wrong Authorisation')
    }
    
});

instance.delete("/api/employees/:id", (req,resp)=>{
    let authValues = req.headers.authorization
    let valid = validate(authValues)

    if (valid){
        let id = req.params.id;    
        let d;
        employees.forEach((v,i)=>{
            if (parseInt(id)==v.EmpNo){
                d = i
            }
        })
        
        if (d >=0){
            
            delete employees[d]
            
            resp.status(202).send(employees)
        }
        else{
            resp.status(204).send('Data not found'+employees)
        }
    }
    else{
        resp.status(401).send('Wrong Authorisation')
    }

} );

function validate(authValues){
    let credValues =  authValues.split(' ');
    let data = credValues[1].split(':');

    if(data[0].trim() === "mahesh" && data[1].trim() === "mahesh"){
       return true
    }
    return false
}

instance.listen(9090, ()=>{
    console.log('REST API is listening on port 9090');
});
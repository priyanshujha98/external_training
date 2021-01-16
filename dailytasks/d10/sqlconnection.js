const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const { response, request } = require('express');
const { send } = require('q');
let instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());

const sequelize = new Sequelize('company','root','ticiom4pj',{
    host:'localhost',
    port:3306,
    dialect:'mysql',
    pool:{
        max:10,
        min:0,
        idle:5000
    },
    define:{
        timestamps:false
    }

})

const dept = require(path.join(__dirname, './models/department.js'))(sequelize, Sequelize.DataTypes);//gotta ask what is this ??

instance.get('/dept',(request,response)=>{
    sequelize.sync({
        force:false
    }).then(()=>{
        let r= dept.findAll()
        // let r = sequelize.query('select * from department')
        // it will give same result twice
        //The first object is the result object, the second is the metadata object (containing affected rows etc) - but in mysql, those two are equal.
        //Pass { type: Sequelize.QueryTypes.SELECT } as a second parameter to ommit the metadata
        return r
    }).then((data)=>{
        console.log(data)
        /* response.json({
            statusCode:200,
            message:data
        }) */
        response.status(200).send(data)
        response.end()
    }).catch((err)=>{
        response.status(500).send('Someting bad happened')
        response.end()
    })

})

instance.get('/dept/:id',(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        let r= dept.findAll({
            where:{DeptNo:{[Op.gte]:id}}
        })
        console.log(r)
        // let r = sequelize.query('select * from department') gives me same data 2 times, gotta find out why ?
        return r
    }).then((data)=>{
        console.log('In then')
        console.log(data)
        /* response.json({
            statusCode:200,
            message:data
        }) */
        response.status(200).send(data)
        response.end()
    }).catch((err)=>{
        console.log(err)
        response.status(500).send({m:'Someting bad happened',msg:err})
        response.end()
    })

})

instance.post('/dept',(request,response)=>{
    let data = {}
    Object.keys(request.body).forEach((v,i)=>{
        data[v]=request.body[v]
    })
    sequelize.sync({
        force:false
    }).then(()=>{
        return dept.create(data)
    }).then((resp)=>{
        response.status(200).send(resp)
        response.end()
    }).catch((err)=>{
        response.status(500).send(err)
        response.end()
    })
})

instance.put('/dept/:id', (request,response)=>{
    let data = {}
    Object.keys(request.body).forEach((v,i)=>{
        data[v] = request.body[v]
    })
    console.log(data)
    let id = parseInt(request.params.id)
    sequelize.sync({
        force:false
    }).then(()=>{
        return dept.update({
            DeptName: data.DeptName,
            DeptCapacity: data.DeptCapacity
        },{where:{DeptNo:id}})
    }).then((resp)=>{
        console.log(resp)
        if (resp[0]==0){
            response.status(204).send(['Did not updated'])
            response.end()
        }
        else{

            response.status(201).send(resp)
            response.end()
        }
    }).catch((err)=>{
        response.status(204).send(err)
        response.end()
    })

})

instance.delete("/dept/:id",(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return dept.destroy({where:{DeptNo:id}})
    }).then((resp)=>{
        console.log(resp)
        response.send(201).send(resp)
    }).catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

const emp = require(path.join(__dirname,'./models/employee.js'))(sequelize,Sequelize.DataTypes)

instance.get("/emp",(request,response)=>{
    sequelize.sync({
        force:false
    }).then(async()=>{
        let r = await sequelize.query('select * from employee left join department on employee.DeptNo=department.DeptNo',{ type: Sequelize.QueryTypes.SELECT })
        return r
    }).then((resp)=>{
        console.log(resp)
        response.status(200).send(resp)
        response.end()
    }).catch((err)=>{
        response.status(504).send(err)
        response.end()
    })

})

instance.get("/emp/:id",(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return emp.findOne({where:{EmpNo:id}})
    }).then((resp)=>{
        response.status(200).send(resp)
    }).catch((err)=>{
        console.log(err)
        response.status(500).send(err)
    })

})
instance.post("/emp",(request,response)=>{
    let data = {}
    Object.keys(request.body).forEach((v,i)=>{
        data[v] = request.body[v]
    })
    console.log(data)
    sequelize.sync({
        force:false
    }).then(()=>{
        return dept.findOne({where:{DeptNo:data.DeptNo}})
    }).then((resp)=>{
        if (resp!=null){
            return emp.create(data)
        }
        else{
            throw new Error('Foriegn Key error')
        }
    })
    .then((resp2)=>{
        response.status(200).send(resp2)
        response.end()
    }).catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.put("/emp/:id",(request,response)=>{
    let data = {}
    let id = request.params.id
    Object.keys(request.body).forEach((v,i)=>{
        data[v] = request.body[v]
    })
    sequelize.sync({
        force:false
    }).then(()=>{
            return emp.update(data,{where:{EmpNo:id}})
    })
    .then((resp)=>{
        console.log(resp)
        if (resp[0]==0){
            response.status(504).send({msg:'Did not updated'})
            response.end()
        }
        else{

            response.status(201).send(resp)
            response.end()
        }
    }).catch((err)=>{
        
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.delete("/emp/:id",(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return emp.destroy({where:{EmpNo:id}})
    }).then((resp)=>{
        response.status(200).send({status:200,msg:resp})
        response.end()
    }).catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.get('/emp/tax/:id',(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return emp.findOne({where:{EmpNo:id}})
    }).then((resp)=>{
        console.log(resp)
        if (resp!=null){
            let v = resp.dataValues
            if(v.EmpSalary <100000){
                response.status(200).send({status:200,Employee:v,taxPercentage:"0%",tax:v.EmpSalary*0 ,Aftertax:(v.EmpSalary-v.EmpSalary*0)})
            }
            else if(v.EmpSalary <200000){
                response.status(200).send({status:200,Employee:v,taxPercentage:"10%",tax:v.EmpSalary*0.1, Aftertax:(v.EmpSalary-v.EmpSalary*0.1)})
            }
            else if(v.EmpSalary <500000){
                response.status(200).send({status:200,Employee:v,taxPercentage:"20%",tax:v.EmpSalary*0.2, Aftertax:(v.EmpSalary-v.EmpSalary*0.2)})
            }
            else {
                response.status(200).send({status:200,Employee:v,taxPercentage:"30%",tax:v.EmpSalary*0.3, Aftertax:(v.EmpSalary-v.EmpSalary*0.3)})
            }
        }
        else{
            throw new Error('No data found')
        }
        
    }).catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.listen(5000)
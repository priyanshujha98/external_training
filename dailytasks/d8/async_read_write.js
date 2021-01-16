let q = require('q')
let http = require('http');
const { createCipher } = require('crypto');

module.exports = {
    getData : function(options){
        let defer = q.defer()
        let request;
        let responseObject;

        if (!options){
            defer.reject('Server info not provided')
        }
        else{
            request = http.request(options,(response)=>{
                response.on('data',(data)=>{
                    responseObject += data
                })
                response.on('end',()=>{
                    try{

                        defer.resolve(responseObject)
                    }
                    catch (err){
                        defer.reject(`Error Occured ${err}`)
                    }
                })
            })
        }
        request.end()
        return defer.promise
    },

    setData : function(options,products){
        let defer = q.defer()
        let req
        let resp
        if (!options){
            defer.reject('Server Congiguration not found')
        }
        else{
            req = http.request(options, (res)=>{
                res.on('data',(data)=>{
                    resp +=data
                })
                res.on('end',()=>{
                    try{

                        defer.resolve(resp)
                    }
                    catch(err){
                        defer.reject(`eror ${err}`)
                    }
                })
            })
        }
        req.write(products)
        req.end()
        return defer.promise
    }
}
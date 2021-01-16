let http = require('http')

let products=[]

let server = http.createServer((request,response)=>{
    request.setEncoding('utf-8');
    response.writeHead(200,{'Content-Type':'application/json'});

    if (request.method == 'GET'){
        if (request.url.split('/')[1]==''){
            
            response.write(JSON.stringify(products))
            
        }
        else{
            products.forEach((v,i)=>{

                if(v.ProductId==parseInt(request.url.split('/')[1])){
                    response.write(JSON.stringify(v))
                }
            })
        }
        response.end()  
    }
    else if(request.method == 'POST'){
        request.on('data',(incomingdata)=>{
            try{
                incomingdata = JSON.parse(incomingdata)
                incomingdata.forEach((v2,i)=>{
                   
                        if (v2.ProductName.length>0 && v2.CategoryName.length>0 && v2.Price>0){
                            
                            v2.ProductId = products.length
                            products.push(v2) 
                    }
                })
                response.write(JSON.stringify(products))
                response.end()
            }
            catch{
                response.write('Inadequate data')
                response.end()
            }
        }).on('error',()=>{
            response.write('Error Occured')
            response.end()
        })
        
    }
    else if(request.method == 'PUT'){

        if (request.url.split('/')[1]==''){
            response.write('Wierd Input')
            response.end()
        }
        else{
            id = parseInt(request.url.split('/')[1])
            
            request.on('data',(updatedata)=>{
                updatedata = JSON.parse(updatedata)
                products.forEach((v,i)=>{
                    if (v.ProductId == id){
                        Object.keys(updatedata).forEach((v2,i2)=>{
                            v[v2] = updatedata[v2]
                            response.write(JSON.stringify(products))
                        })
                    }
                })
                response.end()
            })
        }
        console.log('Done Put')
    }
    else if(request.method == 'DELETE'){
        if (request.url.split('/')[1]==''){
            response.write('Wierd Input')
            response.end()
        }
        else{
            id = parseInt(request.url.split('/')[1])
            products.forEach((v,i)=>{
                if (v.ProductId == id){
                    delete products[i]
                }
            })
            response.write(JSON.stringify(products))
            response.end()
        }
    }
})
server.listen(5000);
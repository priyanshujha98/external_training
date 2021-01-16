let http = require('http')
let fs = require('fs')
const { type } = require('os')

let products = [
    {
        ProductId:"0",
        ProductName:"Test Product",
        CategoryName : "Test",
        Manufacturer : "Test Manufacturer",
        Description : "Test Description",
        BasePrice :"50"
    }
]

let server = http.createServer((request,response)=>{
    request.setEncoding('utf-8')
    fs.readFile('./build/d8.html',{encoding:"ascii"},(error,file)=>{
        if (request.method=='GET'){
            if(request.url != '/getData' ){
                if(error){
                    response.write(JSON.stringify(error.message))
                    response.end()
                }
                else{
                    response.writeHead(200,{'Content-Type':'text/html'});
                    response.write(file)
                    response.end()
                }
            }
            else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.write(JSON.stringify(products))
                response.end()
            }
            
        }
        else if (request.method=='POST'){
            request.on('data',(incomingdata)=>{

                incomingdata = JSON.parse(incomingdata)
                products.push(incomingdata)
                response.writeHead(200,{'Content-Type':'text/html'});
                response.write(JSON.stringify(products))
                response.end()
            })
        }
        
    })

})
server.listen(5000)
console.log('Server is listnening')
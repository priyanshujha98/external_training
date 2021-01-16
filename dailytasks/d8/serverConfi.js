let client = require('./async_read_write.js')

let serverOptions = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path:'/api/Products',
    method: 'GET' 
};

let serverOptionsLocal = {
    host: 'localhost',
    path:'/api/Products',
    method: 'GET',
    port: 5000
};

let serverOptions2 = {
    host: 'apiapptrainingnewapp.azurewebsites.net',
    path:'/api/Products',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};


 client.getData(serverOptions)
        .then((receivedData)=>{
            console.log(JSON.stringify(receivedData));
        })
        .catch((error)=>{
            console.log(`Error Occured ${error}`);
        }); 
/*  ============================================================================
        POST of DATA
    ============================================================================
*/
let products ={
        ProductId:"Prd456",
        ProductName:"Test Product",
        CategoryName : "Test",
        Manufacturer : "Test Manufacturer",
        Description : "Test Description",
        BasePrice :"50"
    }

products = JSON.stringify(products)

client.setData(serverOptions2,products)
        .then((receivedData)=>{
            console.log(JSON.stringify(receivedData));
        })
        .catch((error)=>{
            console.log(`Error Occured ${error}`);
        });
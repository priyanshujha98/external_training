
let express = require('express');
let path = require('path');

// 2. define an express instance

let instace = express();
instace.use(
    express.static(path.join(__dirname, "./../../node_modules/jquery/dist"))
);
let router= express.Router();
instace.use(router);

router.get("/", (req,resp)=>{

    resp.sendFile("index.html", {
        root: path.join(__dirname, './../pages')
    });
});



router.get("/home", (req,resp)=>{
    resp.sendFile("home.html", {
        root: path.join(__dirname, './../pages')
    });
});

router.get("/about", (req,resp)=>{

    resp.sendFile("about.html", {
        root: path.join(__dirname, './../pages')
    });
});
instace.listen(9087, ()=>{
    console.log('Express Web App is started on port 9087');
});


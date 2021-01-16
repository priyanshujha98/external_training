var appLogic = function(){
    this.categories = ['ECT', 'ECL', 'FOD'];
    this.products = [
        {ProductId:101, ProductName:'Laptop', CategoryName: 'ECT', Price:100000},
        {ProductId:102, ProductName:'Iron', CategoryName: 'ECL', Price:2000},
        {ProductId:103, ProductName:'Biscuts', CategoryName: 'FOD', Price:20}
    ];
    this.getProducts = function(){
        return this.products;
    };
    this.addProduct=function(prd){
        this.products.push(prd);
        return this.products;
    };
    this.updateProduct = function(prd){
        for (temp=0; temp<this.products.length; temp++){
            if(this.products[temp].ProductId == prd.ProductId){
                this.products[temp].ProductName = prd.ProductName;
                this.products[temp].CategoryName = prd.CategoryName;
                this.products[temp].Price = prd.Price;
            }
        }
        return this.products;
    }

};
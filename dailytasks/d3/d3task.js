window.addEventListener('load',()=>{
    let product = new Map()
    let search_result = new Map()
    product.set(1,{"ProductName":'Test Name',"CategoryName":'Test Category',"Manufacturer":'Test Manufacturer',"Description": 'Test Description',"BasePrice":"154"})
    display_map(product)
    generate_category_selection()

    document.getElementById('get_items').addEventListener('click',()=>{
        display_map(product)
    })

    document.getElementById('Update_Input_Delete').addEventListener('click',(event)=>{
        let data = document.getElementsByTagName('input')

        
        try{

            if(document.getElementById('selectOption').value=='input'){
                
                let p_id = ''
                let temp={}
               for (let x of data){
                   if(x.id !='ProductId' && x.id !='s_r' && x.id !='s_r1' && x.id !='Search'){
                       if(x.id=='BasePrice'){
                        temp[x.id]=parseFloat(x.value)
                       }
                       else{

                           temp[x.id]=x.value
                       }
                   }
                   else if(x.id=='ProductId' && x.id !='s_r' && x.id !='s_r1' && x.id !='Search'){
                       if (!product.has(x.value)){
        
                           p_id = x.value
                           temp={}
                       }
                       else{
                           throw new Error('Product ALready Exiists')
                       }
                   }
               }
               product.set(p_id,temp)
            }
            else if(document.getElementById('selectOption').value=='update'){
                let p_id = ''
                let temp={}
               for (let x of data){
                   if(x.id !='ProductId' && x.id !='s_r' && x.id !='s_r1' && x.id !='Search'){
                        if(x.id=='BasePrice'){
                            temp[x.id]=parseFloat(x.value)
                        }
                        else{

                            temp[x.id]=x.value
                        }
                   }
                   else if(x.id=='ProductId' && x.id !='s_r' && x.id !='s_r1' && x.id !='Search'){
                       if (product.has(x.value)){
        
                           p_id = x.value
                           temp={}
                       }
                       else{
                           throw new Error('Product Does not Exiists')
                       }
                   }
               }
               product.set(p_id,temp)
               

            }
            else if(document.getElementById('selectOption').value=='del'){
                product.delete(document.getElementById('ProductId').value)
            }
            display_map(product)
        }
        catch(err){
            alert(err)
        }
       
    })

    document.getElementById('ProductId').addEventListener('change',()=>{
        if(document.getElementById('selectOption').value=='update' || document.getElementById('selectOption').value=='del'){
            product.forEach((v,i)=>{
                if (document.getElementById('ProductId').value==i){
                    Object.keys(v).forEach((v2,i2)=>{
                        document.getElementById(v2).value = v[v2]
                    })
                }
            })
        }
    })

    document.getElementById('selectOption').addEventListener('change',()=>{
        for(let x of document.getElementsByTagName('input')){
            if (x.id!='Search'){

                x.value=''
            }
        }
        document.getElementById('Update_Input_Delete').innerHTML =  document.getElementById('selectOption').value +' Data'
    })

    document.getElementById('searchit').addEventListener('click',()=>{
        let search_text = document.getElementById('Search').value
        let search_category = document.getElementById('selector').value

        search_result.clear()
        product.forEach((v,i)=>{
            Object.keys(v).forEach((v2,i2)=>{
                if(v2!='BasePrice'){
                    if(v2==search_category && v[v2].includes(search_text)){
                        search_result.set(i,v)
                    }  
                }
                else{

                    if(v2==search_category && v[v2]==parseFloat(search_text)){
                        search_result.set(i,v)
                    }
                }
            })
        })
        display_map(search_result)
    })

    let counter =0
    document.getElementById('s_r').addEventListener('click',(event)=>{
        
        if(counter ==1){
            document.getElementById('s_r').checked=false
            counter=0
            if(search_result.size>0){
                
                display_map(search_result)
            }
            else{
                display_map(product)
            }
        }
        else{
            document.getElementById('s_r').checked=true
            counter=1

            let temp;
            if(search_result.size>0){
                temp = search_result
            }
            else{
                temp=product
            }

            let arr=[]
            temp.forEach((v,i)=>{
                Object.keys(v).forEach((v2,i2)=>{
                    if (v2==document.getElementById('selector').value){
                        if (v2=='BasePrice'){
                            arr.push(parseFloat(v[v2]))    
                        }
                        else{

                            arr.push(v[v2])
                        }
                    }
                })
            })

            arr = arr.sort()

            let s_map = new Map()

            arr.forEach((v,i)=>{
                temp.forEach((v2,i2)=>{
                    Object.keys(v2).forEach((v3,i3)=>{
                        if (v3 == document.getElementById('selector').value && v2[v3]==v && !s_map.has(i2)){
                           
                            s_map.set(i2,v2)

                        }
                    })
                })
            })
            display_map(s_map)
        }
        

    })
    let reve_counter=0
    document.getElementById('s_r1').addEventListener('click',(event)=>{
        
        if(reve_counter==1){
            document.getElementById('s_r1').checked=false
            reve_counter=0
            if(search_result.size>0){
                
                display_map(search_result)
            }
            else{
                display_map(product)
            }
        }else{
            document.getElementById('s_r1').checked=true
            reve_counter=1
            let temp;
            if(search_result.size>0){
                temp = search_result
            }
            else{
                temp=product
            }

            let arr=[]
            temp.forEach((v,i)=>{
                Object.keys(v).forEach((v2,i2)=>{
                    if (v2==document.getElementById('selector').value){
                        if (v2=='BasePrice'){
                            arr.push(parseFloat(v[v2]))    
                        }
                        else{

                            arr.push(v[v2])
                        }
                    }
                })
            })

            arr = arr.reverse()

            let r_map = new Map()

            arr.forEach((v,i)=>{
                temp.forEach((v2,i2)=>{
                    Object.keys(v2).forEach((v3,i3)=>{
                        if (v3 == document.getElementById('selector').value && v2[v3]==v && !r_map.has(i2)){
                            r_map.set(i2,v2)

                        }
                    })
                })
            })
            display_map(r_map)
        }

    })

    function display_map(incomingdata){
        document.getElementById('loadingImg').style.display=''
        let th=''
        incomingdata.forEach((v,i)=>{
            th+=`<tr><td>${i}</td>`
            Object.keys(v).forEach((v2,i2)=>{
                th+= `<td>${v[v2]}</td>`
            })
            th+=`</tr>`

        })
        document.getElementById('data').innerHTML = th
        document.getElementById('loadingImg').style.display='none'
    }
    function generate_category_selection(){
       
        let temp=''
        for(let x of document.getElementsByTagName('input')){
            if (x.id!='Search' && x.id!='ProductId' && x.id !='s_r' && x.id !='s_r1'){

                temp+=`<option value=${x.id}>${x.id}</option>`
            }
        }
        document.getElementById('selector').innerHTML = temp
    }
})
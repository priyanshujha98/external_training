class Task{
    constructor(){
        this.url = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products'
    }

    
    #validate(validateDdata){
       let data = {
            ProductRowId:'',
            ProductId: '',
            ProductName: '',
            CategoryName: '',
            Manufacturer: '',
            Description: '',
            BasePrice:0
        };
        let flag = true
        this.pxy = new Proxy(data,{
            set(target,prop,value){
                if(value.length > 0 || value >0 || prop=='ProductRowId'){
                    flag = true
                    if (prop == 'ProductId' && value.toLowerCase().match(/[a-z]/i)){
                        flag = true
                        target[prop] = value
                    }
                    else if (prop == 'ProductName' && value.length <30){
                        flag = true
                        target[prop] = value
                    }
                    else if (prop == 'BasePrice' && typeof(value) == 'number'){
                        flag = true
                        target[prop] = value
                    }
                    else if (prop == 'Manufacturer' || prop == 'Description' || prop == 'CategoryName' || prop=='ProductRowId'){
                        target[prop] = value
                        flag = true
                    }
                    else{
                        flag = false
                    }
                }
                else{
                    flag = false
                }
                if (flag){
                    return flag
                }
                
            }
        })
        Object.keys(validateDdata).forEach((v,i)=>{

            this.pxy[v] = validateDdata[v]
        })
        
    }
    postData(data){
        try{
            this.#validate(data)
        }
        catch(err){
            alert(err)
            throw new Error(err)
        }
        
        return new Promise((resolve, reject)=>{
            let req = new XMLHttpRequest();

            req.onload = ()=>{
                if (req.status == 201){
                    resolve(req.response)
                }
                else{
                    reject(req.statusText)
                }
            };

            req.onerror =()=>{
                reject(req.statusText)
            }

            req.open('POST', this.url)
            req.setRequestHeader("Content-Type", "application/json");
            delete data.ProductRowId
            console.log(JSON.stringify(data))
            req.send(JSON.stringify(data))
        })
    }

    getData(){
        return new Promise((resolve, reject)=>{
            let req = new XMLHttpRequest();

            req.onload = ()=>{
                if (req.status == 200){
                    console.log('Successful')
                    resolve(req.response)
                }
                else{
                    reject(req.statusText)
                }
            };

            req.onerror =()=>{
                reject(re.statusText)
            }

            req.open('GET', this.url)
            req.send();
        })
    }

    putData(data){
        try{
            this.#validate(data)
            console.log('Good')
            
        }
        catch(err){
            alert(err)
            throw new Error(err)
        }
        return new Promise((resolve, reject)=>{
            let req = new XMLHttpRequest();

            req.onload = ()=>{
                resolve(req.response)
            }
            req.onerror = ()=>{
                reject(req.statusText)
            }
            
            req.open('PUT',this.url+`/${data['ProductRowId']}`, true)
            req.setRequestHeader("Content-Type", "application/json");
            
            console.log(JSON.stringify(data))
            req.send(JSON.stringify(data))
        })
    }

    deleteData(data){
        return new Promise((resolve, reject)=>{
            let req = new XMLHttpRequest();

            req.onload = ()=>{
                resolve(req.response)
            }
            req.onerror = ()=>{
                reject(req.statusText)
            }
            req.open('DELETE',this.url+`/${data['ProductRowId']}`)
            req.send()
        })
    }
}

window.addEventListener('load',()=>{
    let testVariable = new Task()
    document.getElementById('get_items').addEventListener('click',()=>{
        document.getElementById('data').innerHTML=''
        document.getElementById('loadingImg').style.display = ''
        testVariable.getData().then((sucess)=>{
            sucess = JSON.parse(sucess)
            sucess = sucess.reverse()
            let th=''
            sucess.forEach((v,i) => {
                th += `<tr id=${v['ProductRowId']}>`
                Object.keys(v).forEach((v2,i2)=>{
                    th +=`<td>${v[v2]}</td>`
                })
                th +=`</tr>`
                
            });
            document.getElementById('data').innerHTML = th
            document.getElementById('loadingImg').style.display = 'none'
        }).catch((err)=>{
            alert(`Error : ${err}`)
            document.getElementById('loadingImg').style.display = 'none'
        })
    })
    
    document.getElementById('Update_Input_Delete').addEventListener('click',(event)=>{
        let prdData = {}
        for (let x of document.getElementsByTagName('input')){
            if (x.id == 'BasePrice'){
                prdData[x.id] = parseInt(x.value)
            }
            else{
                prdData[x.id] = x.value
            }
        }
        console.log(prdData)

        if (event.srcElement.value == 'inp'){

            testVariable.postData(prdData).then((success)=>{
                document.getElementById('get_items').click()
            }).catch((err)=>{
                alert(`POST of data is Uncessfull due to error : ${err}`)
            })  
        }
        else if (event.srcElement.value == 'update'){
            testVariable.putData(prdData).then((success)=>{
                document.getElementById('get_items').click()})
              .catch((err)=>{
                alert(`Update of data is Uncessfull due to error : ${err}`)
            })  

        }
        else if (event.srcElement.value == 'del'){
            testVariable.deleteData(prdData).then((success)=>{
                document.getElementById('get_items').click()})
              .catch((err)=>{
                alert(`Delete of data is Uncessfull due to error : ${err}`)
            })  
        }
    })

    document.getElementById('selectOption').addEventListener('change',()=>{
        
        for (let x of document.getElementsByTagName('input')){
            x.disabled = false
            x.value = ''
        }
        if (document.getElementById('selectOption').value=='input'){
            document.getElementById('ProductRowId').disabled = true
            document.getElementById('Update_Input_Delete').value = 'inp'
            document.getElementById('Update_Input_Delete').innerHTML = 'Input Data'
        }
        else if (document.getElementById('selectOption').value=='update'){
            document.getElementById('ProductRowId').disabled = false
            document.getElementById('Update_Input_Delete').value = 'update'
            document.getElementById('Update_Input_Delete').innerHTML = 'Update Data'
        }
        else if (document.getElementById('selectOption').value=='del'){
            for (let x of document.getElementsByTagName('input')){
                x.disabled = true
            }
            document.getElementById('ProductRowId').disabled = false
            document.getElementById('Update_Input_Delete').value = 'del'
            document.getElementById('Update_Input_Delete').innerHTML = 'Delete Data'
        }
    })

    document.getElementById('ProductRowId').addEventListener('change',()=>{
        setValue(document.getElementById('ProductRowId').value)
    })
    
    function setValue(id){
        
        document.getElementById('ProductRowId').value = document.getElementById(id).querySelectorAll('td')[0].innerHTML
        document.getElementById('ProductId').value = document.getElementById(id).querySelectorAll('td')[1].innerHTML
        document.getElementById('ProductName').value = document.getElementById(id).querySelectorAll('td')[2].innerHTML
        document.getElementById('CategoryName').value = document.getElementById(id).querySelectorAll('td')[3].innerHTML
        document.getElementById('Manufacturer').value = document.getElementById(id).querySelectorAll('td')[4].innerHTML
        document.getElementById('Description').value = document.getElementById(id).querySelectorAll('td')[5].innerHTML
        document.getElementById('BasePrice').value = document.getElementById(id).querySelectorAll('td')[6].innerHTML
    }

})
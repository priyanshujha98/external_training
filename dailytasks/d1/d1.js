window.addEventListener('load',function(){
    var experssion = ['AC','+/-','%','/','<br>','7','8','9','*','<br>','4','5','6','-','<br>','1','2','3','+','<br>','0','.','=']

    var temp ='';
    for (x of experssion){
        if (x!="<br>"){
            if (x=='0'){
                temp+="<button value="+x+" style='width:105px'>"+x+"</button>"
            }else{

                temp += "<button value="+x+">"+x+"</button>"
            }
        }
        else{
            temp+=x
        }
        
    }
    document.getElementById('input').innerHTML = temp

    document.getElementById('input').addEventListener('click', function(event){
            if (event.srcElement.value == 'AC'){
                document.getElementById('output').innerHTML=''
            }
            else if(event.srcElement.value=='+/-'){

                var temp = document.getElementById('output').innerHTML
                if(temp[0]=='-'){
                    document.getElementById('output').innerHTML = temp.substr(1,temp.length)
                }
                else{
                    document.getElementById('output').innerHTML = "-"+temp
                }

            }
            else if(event.srcElement.value=="%"){
                document.getElementById('output').innerHTML = parseFloat(document.getElementById('output').innerHTML)/100
            }
            else if(event.srcElement.value == "="){
                document.getElementById('output').innerHTML  = eval(document.getElementById('output').innerHTML )
            }
            else if(event.srcElement.value == undefined && document.getElementById('output').innerHTML.length<=0){
                document.getElementById('output').innerHTML=''
            }
            else if (typeof(event.srcElement.value)=='string'){
                document.getElementById('output').innerHTML += event.srcElement.value
            }
    })
    
})
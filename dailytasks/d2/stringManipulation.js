window.addEventListener( 'DOMContentLoaded', function(event){

    document.getElementById('statementsInput').addEventListener('change', function (){
        
        var enteredString = document.getElementById('statementsInput').value
        enteredString = enteredString.split('.')
        // Challenge 1
        ch1='<div> <h3>Upper casing the first letter of each statement</h3>'
        for (temp=0; temp<enteredString.length; temp++){
            v = enteredString[temp][0]
            a = enteredString[temp]
            if (v != " "){
                ch1 += v.toUpperCase()+ a.slice(1,a.length)+ '<br>';
            }
            else if (v==' '){
                for (temp2=0; temp2<a.length; temp2++){
                    v_temp = a[0]
                    if (v_temp == ' '){
                        a = a.slice(1,a.length)
                    }
                }
                ch1 += v_temp.toUpperCase()+  a.slice(1,a.length)+ '<br>';
            }
            
            
        }
        ch1+='</div>';
        document.getElementById('stringResults').innerHTML  += ch1;

        // Challenge 2

        ch2 = '<div> <h3>First letter of each word  in upper case</h3>'

        for (temp=0; temp<enteredString.length; temp++){
            dis_string = enteredString[temp].split(' ')

            for(temp2=0; temp2<dis_string.length; temp2++){
                v =  dis_string[temp2]
                if (v!=''){
                    ch2 += ' '+v[0].toUpperCase() + v.slice(1, v.length)
                }
            }

            ch2 += '<br>'

        }

        ch2+='</div>';
        document.getElementById('stringResults').innerHTML  += ch2;

        // Challenge 3

        ch3 = '<div> <h3>Finding A and I in letters</h3>'

        for (temp=0; temp<enteredString.length; temp++){
            dis_string = enteredString[temp].split(' ')

            for(temp2=0; temp2<dis_string.length; temp2++){
                v =  dis_string[temp2]
                if (v!=' '){

                    for (x in v){
                        if (v[x].toLowerCase() == 'a' || v[x] == 'i'){
                            ch3 += ' '+v
                        }
                    }

                   
                }
            }

            ch3 += '<br>'

        }

        ch3+='</div>';
        document.getElementById('stringResults').innerHTML  += ch3;

        // Challenge 4

        ch4 = '<div> <h3>Reversing each word in String</h3>'

        for (temp=0; temp<enteredString.length; temp++){
            dis_string = enteredString[temp].split(' ')

            for(temp2=0; temp2<dis_string.length; temp2++){
                v =  dis_string[temp2]
                if (v!=''){
                    ch4+= ' '
                    for (x=v.length-1;x>=0;--x){
                        ch4 += v[x]
                    }
                    
                }
            }

            ch4 += '<br>'

        }

        ch4+='</div>';
        document.getElementById('stringResults').innerHTML  += ch4;

        // Challenge 5

        ch5 = '<div> <h3>First letter of each statement in upper case</h3>'

        for (temp=0; temp<enteredString.length; temp++){
            dis_string = enteredString[temp].split(' ')

            for(temp2=0; temp2<dis_string.length; temp2++){
                v =  dis_string[temp2]
                if (v!=' '){
                    ch5 += v+'-'
                }
            }

            ch2 += '<br>'

        }

        ch5+='</div>';
        document.getElementById('stringResults').innerHTML  += ch5;

        
    })
});
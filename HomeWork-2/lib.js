let getCookie = function(data){
    let name = ''
    let cookie = []
    let b = 0
    for(let i = 0; i < data.length; i++){
        let value = data[i].toString()
        for(let j = 0; j < value.length; j++){
            if(data[i][j] == "="){
            if(name == 'SessionID'){
                b = 1
            }
            else if(name == 'email'){
                b = 2
            }
            name = ''
            }
            else if(data[i][j] != " "){
            name += data[i][j]
            }
        }
        if(b == 1){
            cookie.push({'SessionID': name})
            b = 0
        }
        else if(b == 2){
            cookie.push({'email': name})
            b = 0
        }
        name = ''
    }
    return cookie;
};




module.exports.getCookie = getCookie;
function signup(username, password){
    if(password == undefined || username == undefined){
        var throwError = false;
        if($("#Username")[0].value == ""){
            $("#1Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#1Err")[0].classList.add("hidden");
        }
        if($("#password")[0].value == ""){
            $("#2Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#2Err")[0].classList.add("hidden");
        }
        if($("#comfPassword")[0].value == ""){
            $("#3Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#3Err")[0].classList.add("hidden");
        }
        /*
        if($("#email")[0].value == ""){
            $("#4Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#4Err")[0].classList.add("hidden");
        }*/
        
        username = $("#Username")[0].value;
        password = $("#password")[0].value;
        confPass = $("#comfPassword")[0].value;
        email = $("#email")[0].value;
        if(password != confPass){
            throwError = true;
            alert("Error passwords do not match");
        }
        if($("#email")[0].value == ""){
            if(confirm("Are you sure that you don't want to add an email? You will not be able to recover your account if you forget your password.")){
                console.log("No email wanted");
            }
            else{
                throwError = true;
            }
        }
        
    }
    if(!throwError){
$.ajax({

    'url' : '/signup',
    'method' : 'POST',
    'data' : {
        'username' : username, "password" : password, 'email': email
    },
    'success' : function(data) {              
        alert('Data: '+data);

    }
});
}

}


function login(username, password){
    $.ajax({
    
        'url' : '/login',
        'type' : 'POST',
        'data' : {
            'username' : username, "password" : password
        },
        'success' : function(data) {              
            alert('Data: '+data);
    
        }
    });}
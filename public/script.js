var darkMode = false;
function signup(username, password){
    var throwError = false;
    if(password == undefined || username == undefined){
        
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


    


    var throwError = false;
    if(password == undefined || username == undefined){
        
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
        username = $("#Username")[0].value;
        password = $("#password")[0].value;
    }
    if(!throwError){
    $.ajax({
    
        'url' : '/login',
        'type' : 'POST',
        'data' : {
            'username' : username, "password" : password
        },
        'success' : function(data) {              
            alert('Data: '+data);
    
        }
    });}}



function forgot(username, email){


    


    var throwError = false;
    if(email == undefined || username == undefined){
        
        if($("#Username")[0].value == ""){
            $("#1Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#1Err")[0].classList.add("hidden");
        }
        if($("#email")[0].value == ""){
            $("#2Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#2Err")[0].classList.add("hidden");
        }
        username = $("#Username")[0].value;
        email = $("#email")[0].value;
    }
    if(!throwError){
        $.ajax({
        
            'url' : '/forgot',
            'type' : 'POST',
            'data' : {
                'username' : username, "email" : email
            },
            'success' : function(data) {              
                alert('Data: '+data);
        
            }
        });}

}



function sendResetPasswordRequest(password){
    let params = new URLSearchParams(location.search);
    var username = params.get("username");
    var token = params.get("token");


    var throwError = false;
    if(password == undefined){
        
        if($("#Password")[0].value == ""){
            $("#1Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#1Err")[0].classList.add("hidden");
        }
        if($("#PasswordComf")[0].value == ""){
            $("#2Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#2Err")[0].classList.add("hidden");
        
        password = $("#Password")[0].value;
        confPass = $("#PasswordComf")[0].value;
        if(password != confPass){
            throwError = true;
            alert("Error passwords do not match");
        }
        
        
    }}
    if(!throwError){
        $.ajax({
        
            'url' : '/resetService',
            'type' : 'POST',
            'data' : {
                'username' : username, "token" : token, "newPassword": password
            },
            'success' : function(data) {              
                alert('Data: '+data);
        
            }
        });
    }
}






    window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
        console.log(`changed to ${e.matches ? "dark" : "light"} mode`)
      
      
        if(e.matches == false){
            $("body")[0].style = "color:black;background-color: white;";
            darkMode = false;
        }
        else{
            $("body")[0].style = "color:white;background-color: black;";
            darkMode = true;
        }
    });
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $("body")[0].style = "color:white;background-color: black;";
            darkMode = true;
    }
    
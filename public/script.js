//I know I spelled confirm wrong. I thought that I was spelling it the right way and "confirm" was wrong. But it's too late now. Maybe I'll do a commit where I just add comments and fix spelling mistakes.


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
        alert(data);
        if(data == 'Account Successfully Made'){
            redirectMain("https://CCamSIS.misterguy2013.repl.co","?","?")
          
        }

    }
});
}

}


function settings(){
  var params = new URLSearchParams(location.search);
  var username = params.get("username");
  var sessionID = params.get("session");
  redirectMain("https://CCamSIS.misterguy2013.repl.co/settings.html", username, sessionID);
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
           var parseData = data.split("|");          
            alert(parseData[0]);
            if(parseData[0] == 'Login success!'){
          var params = new URLSearchParams(location.search);
          if(params.get("redirect")==undefined){
            redirectMain("https://CCamSIS.misterguy2013.repl.co",parseData[1],parseData[2])
          }
          else{
            redirectMain(params.get("redirect"),parseData[1],parseData[2])
          }
        }
    
        }
    });}}








  



function resetEmailMenu(){
  if($("#emailReset")[0].classList == ""){
    updateEmail();
  }
  else{
    $("#emailReset")[0].classList.remove("hidden");
  }
}

function resetPasswordMenu(){
  if($("#passwordReset")[0].classList == ""){
    updatePassword();

  }
  else{
    $("#passwordReset")[0].classList.remove("hidden");
  }
}

function updatePassword(username, oldPassword, newPassword){


    var throwError = false;
    if(oldPassword == undefined || username == undefined || newPassword == undefined){
        var params = new URLSearchParams(location.search);
        username = params.get("username");

        if($("#oldPassword")[0].value == ""){
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
        if($("#confPassword")[0].value == ""){
            $("#3Err")[0].classList.remove("hidden");
            throwError = true;
        }
        else{
            $("#3Err")[0].classList.add("hidden");
        }
        oldPassword = $("#oldPassword")[0].value;
        password = $("#password")[0].value;
        confPassword = $("#confPassword")[0].value;
        if(password != confPassword){
          alert("Passwords do not match");
          throwError = true;
        }
        
    }
    if(!throwError){
    $.ajax({
    
        'url' : '/updatePassword',
        'type' : 'POST',
        'data' : {
            'username' : username, "oldPassword" : oldPassword, "newPassword":password
        },
        'success' : function(data) {    
           var parseData = data.split("|");          
            alert(parseData[0]);
            if(parseData[0] == 'Login success!'){
            var params = new URLSearchParams(location.search);
            redirectMain("https://CCamSIS.misterguy2013.repl.co",parseData[1],parseData[2])
          
        }
    
        }
    });}}


    function updateEmail(username, password, newEmail){
console.log("E")

    var throwError = false;
    if(password == undefined || username == undefined || newEmail == undefined){
        var params = new URLSearchParams(location.search);
        username = params.get("username");

        if($("#passwordEmail")[0].value == ""){
            $("#4Err")[0].classList.remove("hidden");
            throwError = true;console.log(throwError)
        }
        else{
            $("#4Err")[0].classList.add("hidden");
        }
        if($("#email")[0].value == ""){
            $("#5Err")[0].classList.remove("hidden");
            throwError = true; 
        }
        else{
            $("#5Err")[0].classList.add("hidden");
        }
        newEmail = $("#email")[0].value;
        password = $("#passwordEmail")[0].value;
        
        
        
    }
    if(!throwError){
      console.log("Ee")
    $.ajax({
    
        'url' : '/updateEmail',
        'type' : 'POST',
        'data' : {
            'username' : username, "password":password, "newEmail":newEmail
        },
        'success' : function(data) {    
           var parseData = data.split("|");          
            alert(parseData[0]);
            if(parseData[0] == 'Login success!'){
            var params = new URLSearchParams(location.search);
            redirectMain("https://CCamSIS.misterguy2013.repl.co",parseData[1],parseData[2])
          
        }
    
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


function mainlogin(){
  var username = params.get("username");
  var token = params.get("password");
  if(username){
    
  }
}
function redirectMain(url,username,sessionID){
  window.location.replace(url + `?username=${username}&session=${sessionID}`);
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
    
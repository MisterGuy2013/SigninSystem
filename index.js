const { createHash } = require('crypto');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const { scryptSync, randomBytes, timingSafeEqual, createSign, createVerify } = require('crypto');
const { publicKey, privateKey } = require('keypair');
const fs = require("fs");
const nodemailer = require('nodemailer'); 

const app =  express();
const port = process.env.PORT || 8080;









// Create a string hash

function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}

function writeUser(content){
    jsonContent = JSON.stringify(content);
    fs.writeFile('./Database/Users.json', jsonContent, { flag: 'w+' }, err => {console.log(err);})
}
function readUsers(){
    var data = fs.readFileSync('./Database/Users.json', 'utf8');
    var jsonData = JSON.parse(data);
    return jsonData;
}


function modifyUser(userID, newUser){
    
}






function signup(username, email, password) {
    
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { Username:username, Password: `${salt}:${hashedPassword}`, Email:email }


    console.log(users);


  if(!users.filter(e => e.Username === username).length > 0){
    users.push(user);
    writeUser(users);
    return "Account Successfully Made"
  }
  else{
      return "Error, username already in use"
  }
  
  
}

function login(username, password) {
    var errorMes = "Username or Password incorrect";
    if(users.filter(e => e.Username === username).length > 0 == true){
    const user = users.find(v => v.Username === username);
  
    const [salt, key] = user.Password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        

        return `login success!`
    } else {
        return errorMes;
    }
}
else{
    return errorMes;
}
}

function addUserData(username, password, appName, data){
    var errorMes = "Username or Password incorrect";
    if(users.filter(e => e.Username === username).length > 0 == true){
    const user = users.find(v => v.Username === username);
    const userIndex = users.findIndex(v => v.Username === username);
  
    const [salt, key] = user.Password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        if(appName == "Username" || appName == "Email" || appName == "Password"){
         return "YOU DO NOT HAVE THE CORRECT PERMISSIONS";
        }
        else{
        user[appName] = JSON.parse(data);
        users.splice(userIndex, userIndex, user);
        console.log(user);
        writeUser(users);
        return `success`
        }
    } else {
        return errorMes;
    }
}
else{
    return errorMes;
}
}

function getUserData(username, password, appName){
    var errorMes = "Username or Password incorrect";
    if(users.filter(e => e.Username === username).length > 0 == true){
    const user = users.find(v => v.Username === username);
  
    const [salt, key] = user.Password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        if(appName == "Username" || appName == "Email" || appName == "Password"){
            return "you do not have the permissions neccessary to read this file";
        }
        else{

        return user[appName];
        }
    } else {
        return errorMes;
    }
}
else{
    return errorMes;
}
}




function sendEmail(username, email){
    var data = fs.readFileSync('./Database/emailInfo.txt', 'utf8');
    var emailUsername = data.split("|")[0];
    var emailPassword = data.split("|")[1];

    var emailService = "gmail";

    var token = randomBytes(32).toString('hex');

    var beggingString = `http://localhost:3000`

    var errorMes = "Username not found";
    if(users.filter(e => e.Username === username).length > 0 == true){
    const user = users.find(v => v.Username === username);
    const userIndex = users.findIndex(v => v.Username === username);

    if(user.Email === email){
        user.Token = token;
        users.splice(userIndex, userIndex, user);
        writeUser(users);

        setTimeout(function(){
            user.Token = "E";
            users.splice(userIndex, userIndex, user);
            writeUser(users);
            console.log("expired");
        }, 300000);

    var transporter = nodemailer.createTransport({
        service: emailService,
        auth: {
          user: emailUsername,
          pass: emailPassword
        }
      });
      
      var mailOptions = {
        from: emailUsername,
        to: email,
        subject: 'ChickenCam SIS Password Reset',
        html: `<html> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script><body>
        <h1>Reset Password</h1><a href='${beggingString}/resetService.html?username=${user.Username}&token=${token}'>Click to Reset Password</a>
        <div>This link will expire in 5 minutes</div></body><style>body{
            color:black;
            background-color: white;
        }</style>
        
        <script>window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {                   
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
        }</script>
        
        </html>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    }
    else{
        return errorMes;
    }


    }
    else{
        return errorMes;
    }

}


function resetPassword(username, token, password){
    var errorMes = "Username not found";
    if(users.filter(e => e.Username === username).length > 0 == true){
    const user = users.find(v => v.Username === username);
    const userIndex = users.findIndex(v => v.Username === username);
    if(user.Token == token){
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = scryptSync(password, salt, 64).toString('hex');
        user.Password = `${salt}:${hashedPassword}`;
        user.Token = "E";
        users.splice(userIndex, userIndex, user);
        writeUser(users);
        return "Password Reset!"
    }
    else{
        return "Error, Token Expired"
    }

    }
    else{
        return errorMes;
    }
}








//ON STARTUP
const users = readUsers();
console.log(users.length);

for(let i = 0; i<users.length; i++){
    users[i].Token = "E";
}
writeUser(users);

/* fs.readdir("./", function (err, files) {
    console.log(files)
});*/










app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '//index.html'));
    console.log(req);
})

app.listen(3000, function(){
  console.log("Server started on port 3000.")
})
app.get('index.html', function(req, res) {
    res.send("");
});
app.post('/signup', function(req,res){
    var user = signup(req.body.username, req.body.email, req.body.password);
    console.log(user);

    res.send(user);
});
app.post('/login', function(req,res){
    var user = login(req.body.username, req.body.password);
    console.log(user);

    res.send(user);
});
app.post('/addUserData', function(req,res){
    var user = addUserData(req.body.username, req.body.password, req.body.appName, req.body.data);
    console.log(user);

    res.send(user);
});
app.post('/getUserData', function(req,res){
    var user = getUserData(req.body.username, req.body.password, req.body.appName);

    res.send(user);
});
app.post('/forgot', function(req,res){
    sendEmail(req.body.username, req.body.email);
    res.send("done");
});
app.post("/resetService", function(req, res){
    var username = req.body.username;
    var newPass = req.body.newPassword;
    var token = req.body.token;
    if(token == "E"){
        //To make sure people don't use blank tokens
        token = "";
    }
    var response = resetPassword(username, token, newPass);
    res.send(response);

});


app.listen(port);
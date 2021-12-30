const { createHash } = require('crypto');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');
const fs = require("fs");

const app =  express();
const port = process.env.PORT || 8080;









// Create a string hash

function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}

function writeUser(content){
    fs.writeFile('/Database/Users.json', content, { flag: 'a+' }, err => {console.log(err);})
}
function readUsers(){
    fs.readFile('/package.json', (err, data) => {
        if (err) {
          console.error(err)
          return "Oops, a server error has occured. Please try again later";
        }
        jsonData = JSON.parse(data);
        return jsonData
      })
}
function modifyUser(userID, newUser){

}


function signup(username, email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { Username:username, Password: `${salt}:${hashedPassword}`, Email:email }
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
    if(users.username.includes(username) == true){
    const user = users.find(v => v.username === username);
  
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        return 'login success!'
    } else {
        return errorMes;
    }
}
else{
    return errorMes;
}
}










//ON STARTUP

const users = readUsers();
console.log(users);
fs.readdir("/", function (err, files) {
    console.log(files)
});










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
    console.log(req.body.password);
    var user = signup(req.body.username, req.body.email, req.body.password);
    console.log(user);

    res.send(user);
});
app.post('/login', function(req,res){
    var user = login(req.body.username, req.body.password);
    console.log(user);

    res.send(user);
});
app.listen(port);
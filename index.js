const { createHash } = require('crypto');
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const app =  express();
const port = process.env.PORT || 8080;









// Create a string hash

function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}



function signup(email, username, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, username, password: `${salt}:${hashedPassword}` }
  
    users.push(user);

    return user
}

function login(email, password) {
    const user = users.find(v => v.email === email);
  
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}

const users = [];

const user = signup('foo@bar.com', 'pa$$word');

console.log(user)

const result = login('foo@bar.com', 'password')

console.log(result)











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


    res.send("rickastley time")
});
app.listen(port);
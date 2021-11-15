var express = require('express');
var request = require('request');
var app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(__dirname + '/public')); //__dir and not _dir
app.use(express.urlencoded({extended: true}));
app.use(express.json())

var port = 6969; // you can use any port

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();  
 });

 app.post("/submit", (req, res)=>{
    const token = process.env.TOKEN
    console.log(token)
    const url_line_notification = "https://notify-api.line.me/api/notify";
    if (token == '') {
        res.end("");
    }

    request({
         method: 'POST',
         uri: url_line_notification,
         header: {
             'Content-Type': 'multipart/form-data',
         },
         auth: {
             bearer: token,
         },
         form: {
             message: req.body.detail
         },
     }, (err, httpResponse, body) => {
         if (err) {
             console.log(err)
         } else {
             console.log(body)
         }
     });
    
    console.log(req.body);
    res.end("yes");
});

app.listen(port, () => {console.log('server on' + port)});

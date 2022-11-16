const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "mylotto",
})

connection.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello 52!')
});

app.post("/idplz", (req, res) => {
    //const serverid = req.body.plzid;
    //console.log(serverid);
    // const sendText = {
    //     text : serverid,
    // }
    // res.send(sendText);
    const test = req.body.test;
    connection.query("INSERT INTO test (test_body) values (?)",
    [test],
    function(err,rows,fields){
        if(err){
            console.log("실패");
        } else {
            console.log("성공");
        }
    });
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`)
});
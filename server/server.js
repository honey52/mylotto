const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello 52!')
});

app.post("/idplz", (req, res) => {
    const serverid = req.body.plzid;
    console.log(serverid);
    const sendText = {
        text : serverid,
    }
    res.send(sendText);
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`)
});
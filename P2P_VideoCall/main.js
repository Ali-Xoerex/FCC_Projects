const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.use(express.static("client"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/client/" + "home.html");
});

server.listen(3000, () =>{
    console.log("server started");
});
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("client"));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/client/" + "home.html");
});

io.on("connection", (socket) =>{
    console.log("connected to socket!");

    socket.on("requestroom", (data) =>{
        if (! io.of("/").adapter.rooms.has(data["room"]) || (io.of("/").adapter.rooms.has(data["room"]) && io.of("/").adapter.rooms.get(data["room"]).size < 2)){
            socket.join(data["room"]);
        } else {
            socket.emit("roomerror");
        }
    });
});

server.listen(3000, () =>{
    console.log("server started");
});
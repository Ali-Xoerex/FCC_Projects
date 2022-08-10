var socket = io();
var video = document.querySelector("#videoplayer");

if (navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
        var room = prompt("Enter a room:");
        while (room === '' || room === null){
            room = prompt("Enter a room:");
        }
        socket.emit("requestroom",{"room":room});
        video.srcObject = stream;
    }).catch((err) => {
        console.log("some error happended with fetching video feed");
    });
}

socket.on("roomerror", () =>{
    alert("Room full or invalid!");
    room = prompt("Enter a room:");
    while (room === '' || room === null){
        room = prompt("Enter a room:");
    }
    socket.emit("requestroom",{"room":room});
});

socket.on("sendfeed", (data) => {
    socket.emit("feed",{"data":"Hello","room":data["room"]});
});

socket.on("getfeed", (data) =>{
    console.log(data);
});


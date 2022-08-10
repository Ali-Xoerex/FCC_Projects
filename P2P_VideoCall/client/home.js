var video = document.querySelector("#videoplayer");

if (navigator.mediaDevices.getUserMedia){
    
    navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
        video.srcObject = stream;
    }).catch((err) => {
        console.log("some error happended with fetching video feed");
    });
}
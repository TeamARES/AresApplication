var Host = require('socket.engine').host; 
var h = new Host(addr = "127.0.0.1", port = 8000);
h.start();
h.on("speed-fl", (data) => {
    document.getElementById("speed-fl").innerHTML = data;
});
h.on("speed-bl", (data) => {
    document.getElementById("speed-bl").innerHTML = data;
});
h.on("speed-fr", (data) => {
    document.getElementById("speed-fr").innerHTML = data;
});
h.on("speed-br", (data) => {
    document.getElementById("speed-br").innerHTML = data;
});
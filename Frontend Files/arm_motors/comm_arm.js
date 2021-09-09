var Host = require('socket.engine').host; 
var h = new Host(addr = "127.0.0.1", port = 8001);
h.start();

h.on("m1", (data) => {
    if (data == 0) 
        document.getElementById("b1").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b1").style.background = "#019E66";
    else 
        document.getElementById("b1").style.background = "#CA6F1E";
});

h.on("m2", (data) => {
    if (data == 0) 
        document.getElementById("b2").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b2").style.background = "#019E66";
    else 
        document.getElementById("b2").style.background = "#CA6F1E";
});

h.on("m3", (data) => {
    if (data == 0) 
        document.getElementById("b3").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b3").style.background = "#019E66";
    else 
        document.getElementById("b3").style.background = "#CA6F1E";
});

h.on("m4", (data) => {
    if (data == 0) 
        document.getElementById("b4").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b4").style.background = "#019E66";
    else 
        document.getElementById("b4").style.background = "#CA6F1E";
});

h.on("m5", (data) => {
    if (data == 0) 
        document.getElementById("b5").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b5").style.background = "#019E66";
    else 
        document.getElementById("b5").style.background = "#CA6F1E";
});

h.on("m6", (data) => {
    if (data == 0) 
        document.getElementById("b6").style.background = "rgba(22, 22, 22, 0.3)";
    else if(data > 0)
        document.getElementById("b6").style.background = "#019E66";
    else 
        document.getElementById("b6").style.background = "#CA6F1E";
});

h.on("status_arm", (data) => {
    if(data > 0){
        document.getElementById("status").textContent = "Active";
        document.getElementById("status").style.color = "#019E66"
    }
    else{
        document.getElementById("status").textContent = "Inactive";
        document.getElementById("status").style.color = "red"
    }
});
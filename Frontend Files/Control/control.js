var Client = require("socket.engine").client;
var c = new Client(addr = "127.0.0.1", port = 8003);
c.start();

var col_selector = document.getElementById("col")
var button_fan1 = document.getElementById("fan1")
var button_fan2 = document.getElementById("fan2")
var button_kill = document.getElementById("kill")
var fan1_state = 0
var fan2_state = 0
var kill_state = 0
col_selector.addEventListener("change", col_f, false);
function col_f(event){
    console.log(parseInt(event.target.value[1] + event.target.value[2], 16));
    c.write("r", parseInt(event.target.value[1] + event.target.value[2], 16));
    c.write("g", parseInt(event.target.value[3] + event.target.value[4], 16));
    c.write("b", parseInt(event.target.value[5] + event.target.value[6], 16));
};

button_fan1.addEventListener("change", Fan1, false);
function Fan1(event){
    fan1_state = (fan1_state ^ 1);
    console.log(fan1_state)
    c.write("fan1", fan1_state);
};

button_fan2.addEventListener("change", Fan2, false);
function Fan2(event){
    fan2_state = (fan2_state ^ 1);
    console.log(fan2_state)
    c.write("fan2", fan2_state);
};

button_kill.addEventListener("change", Kill, false);
function Kill(event){
    kill_state = (kill_state ^ 1);
    console.log(kill_state)
    c.write("kill", kill_state);
};

